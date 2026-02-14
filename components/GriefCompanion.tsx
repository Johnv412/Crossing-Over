
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// Helper for base64 encoding/decoding as per Gemini Live SDK requirements
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const GriefCompanion: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I am Crossing Over Live. I can listen to your voice or read your messages. How is your heart feeling in this moment?",
      timestamp: new Date()
    }
  ]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [input, setInput] = useState('');

  const audioContexts = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentTranscriptionRef = useRef('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopVoiceSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    for (const source of sourcesRef.current) {
      try { source.stop(); } catch (e) { }
    }
    sourcesRef.current.clear();
    setIsVoiceActive(false);
    setIsConnecting(false);
  };

  const startVoiceSession = async () => {
    if (isVoiceActive) {
      stopVoiceSession();
      return;
    }

    setIsConnecting(true);
    // Try Environment Variable first, then localStorage (Settings Panel)
    const apiKey = process.env.API_KEY || localStorage.getItem('dez_gemini_api_key') || (window as any).wpConfig?.apiKey;

    if (!apiKey) {
      alert("API Key is missing. Please add your Gemini API Key in the site settings (gear icon) or server environment.");
      setIsConnecting(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      if (!audioContexts.current) {
        audioContexts.current = {
          input: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 }),
          output: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }),
        };
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          outputAudioTranscription: {},
          systemInstruction: 'You are Crossing Over Live, a compassionate companion for those experiencing loss. Speak warmly and offer spiritual comfort. Keep responses empathetic and succinct. When someone types to you, respond naturally with your voice.',
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsVoiceActive(true);

            const source = audioContexts.current!.input.createMediaStreamSource(stream);
            const scriptProcessor = audioContexts.current!.input.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => {
                if (sessionRef.current) session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContexts.current!.input.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const ctx = audioContexts.current!.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.outputTranscription) {
              currentTranscriptionRef.current += message.serverContent.outputTranscription.text;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'model' && last.id === 'live-transcription') {
                  return [...prev.slice(0, -1), { ...last, text: currentTranscriptionRef.current }];
                } else {
                  return [...prev, {
                    id: 'live-transcription',
                    role: 'model',
                    text: currentTranscriptionRef.current,
                    timestamp: new Date()
                  }];
                }
              });
            }

            if (message.serverContent?.turnComplete) {
              currentTranscriptionRef.current = '';
              setMessages(prev => prev.map(m => m.id === 'live-transcription' ? { ...m, id: `final-${Date.now()}` } : m));
            }

            if (message.serverContent?.interrupted) {
              for (const s of sourcesRef.current) { try { s.stop(); } catch (e) { } }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopVoiceSession(),
          onerror: (e) => {
            console.error("Live session error:", e);
            stopVoiceSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error("Failed to start voice session:", err);
      setIsConnecting(false);
      alert("Could not access microphone or connect to AI. Ensure you are using HTTPS and have added a valid API Key.");
    }
  };

  const handleSendText = async () => {
    const textToSend = input.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (sessionRef.current && isVoiceActive) {
      sessionRef.current.sendRealtimeInput({ text: textToSend });
    } else {
      const response = await sendMessageToGemini(
        messages.map(m => `${m.role === 'user' ? 'User' : 'Companion'}: ${m.text}`),
        textToSend
      );

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[650px] max-w-4xl mx-auto my-8 transition-all">
      <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-5 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isVoiceActive ? 'bg-white text-brand-600 animate-pulse' : 'bg-white/20 text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold">Crossing Over Live</h2>
            <p className="text-xs text-brand-100 uppercase tracking-widest font-bold">
              {isVoiceActive ? 'Voice Connection Active' : isConnecting ? 'Connecting...' : 'Ready to listen'}
            </p>
          </div>
        </div>

        <button
          onClick={startVoiceSession}
          disabled={isConnecting}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${isVoiceActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white text-brand-700 hover:bg-brand-50'
            }`}
        >
          {isVoiceActive ? 'End Voice Mode' : isConnecting ? 'Connecting...' : 'Start Voice Mode'}
        </button>
      </div>

      {isVoiceActive && (
        <div className="h-32 bg-brand-50/50 flex flex-center justify-center items-center relative overflow-hidden border-b border-brand-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-brand-400/20 rounded-full animate-ping"></div>
            <div className="w-20 h-20 bg-brand-500/30 rounded-full absolute animate-pulse"></div>
          </div>
          <p className="relative z-10 text-brand-700 font-medium italic animate-pulse">"I am here, listening..."</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-sm ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] block mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            placeholder={isVoiceActive ? "Type to trigger her voice response..." : "Start Voice Mode or type here..."}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700"
          />
          <button
            onClick={handleSendText}
            className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex justify-between items-center px-1">
          <p className="text-[10px] text-slate-400">All responses will appear in the log as she speaks them.</p>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isVoiceActive ? 'bg-green-500' : 'bg-slate-300'}`}></div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Live Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GriefCompanion;
