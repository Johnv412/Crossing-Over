
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Crossing Over Live", the personalized companion for "Crossing Over with Dez".
Empathy is your primary directive. Offer comfort, spiritual perspective, and a safe space to vent.
Website owner: Dez (Spiritual Medium).
Philosophy: Love never dies; connection continues.
`;

export const sendMessageToGemini = async (history: string[], newMessage: string): Promise<string> => {
  try {
    // Use Environment Variable instead of user settings
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("CRITICAL: API_KEY is missing from environment and local settings.");
      return "I apologize, but my connection to the spiritual network is currently down. The site's environment API Key is missing.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ${SYSTEM_INSTRUCTION}
      
      Recent Context:
      ${history.slice(-5).join('\n')}
      
      Message: ${newMessage}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I am here and listening, even in the silence.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API_KEY_INVALID')) {
      return "My spiritual connection is blocked. This is usually due to an invalid or restricted API key. Please check your settings.";
    }
    return "The path is momentarily foggy. Please take a deep breath and try again in a few seconds.";
  }
};
