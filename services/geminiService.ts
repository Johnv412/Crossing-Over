import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Personalized Grief Companion", a compassionate, AI-powered assistant for the website "Crossing Over with Dez".
Your role is to provide empathetic support, listening, and gentle spiritual guidance to users who may be grieving or seeking spiritual connection.
The website owner is 'Dez', a spiritual medium.

Guidelines:
1. Tone: Warm, non-judgmental, soothing, and hopeful. Use phrases like "I hear you," "It's understandable to feel that way," and "Take your time."
2. Boundaries: You are NOT a replacement for professional therapy or crisis counseling. If a user expresses desire for self-harm, gently direct them to professional help immediately.
3. Context: You can mention Dez's services (readings, workshops) if relevant to their journey, but do not be pushy.
4. Spirituality: You honor the belief in an afterlife and the continuity of the soul, aligning with Dez's philosophy.
5. Content: Offer simple breathing exercises, journaling prompts, or affirmations if the user seems overwhelmed.

Keep responses concise (under 150 words) unless asked for more detail.
`;

export const sendMessageToGemini = async (history: string[], newMessage: string): Promise<string> => {
  try {
    // Attempt to get API Key from process.env (Standard) 
    // or from window.wpConfig (WordPress injected)
    const apiKey = process.env.API_KEY || (window as any).wpConfig?.apiKey;
    
    if (!apiKey) {
      console.warn("No API_KEY found. Please define GEMINI_API_KEY in wp-config.php or as an environment variable.");
      return "I'm having trouble connecting to the spiritual network right now (API Key is missing). Please check the setup or contact support.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      ${SYSTEM_INSTRUCTION}
      
      Past Conversation Context:
      ${history.join('\n')}
      
      User's New Message: ${newMessage}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using the latest recommended model
      contents: prompt,
    });

    return response.text || "I am listening, but I cannot find the words right now.";

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I apologize, I am experiencing a temporary disconnection. Please breathe deeply and try again in a moment.";
  }
};