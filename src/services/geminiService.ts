export const sendMessageToGemini = async (history: string[], newMessage: string, apiKey: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        newMessage,
        apiKey
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.text;

  } catch (error) {
    console.error("Error communicating with backend:", error);
    return "I apologize, I am experiencing a temporary disconnection. Please breathe deeply and try again in a moment.";
  }
};