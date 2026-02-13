require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from 'dist' directory (build artifacts)
app.use(express.static(path.join(__dirname, 'dist')));
// Also serve from root for assets if needed, but prefer dist
app.use(express.static(__dirname));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Gemini API Proxy
app.post('/api/chat', async (req, res) => {
  try {
    const { history, newMessage, apiKey: clientApiKey } = req.body;
    const apiKey = process.env.API_KEY || clientApiKey;

    if (!apiKey) {
      console.error("API_KEY is missing");
      return res.status(500).json({ error: "Server configuration error: API Key missing. Please set it in Settings." });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct prompt from history + system instruction
    // Note: In a production app, you might want to manage history more robustly
    // For now, we trust the client's history or reconstruct it.
    // The previous service constructed a prompt string, let's replicate that logic or use the chat API.
    // The previous service was single-turn "generateContent" with a prompt that included history.
    // We will stick to that for consistency with the "lightweight" request.

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

    const prompt = `
      ${SYSTEM_INSTRUCTION}
      
      Past Conversation Context:
      ${Array.isArray(history) ? history.join('\n') : ''}
      
      User's New Message: ${newMessage}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const text = response.text || "I am listening, but I cannot find the words right now.";
    res.json({ text });

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({ error: "Failed to communicate with the spiritual network." });
  }
});

// Handle SPA routing - send index.html for any request that doesn't match a file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
