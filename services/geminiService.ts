import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { SYSTEM_INSTRUCTION, INITIAL_PROMPT, getFollowUpPrompt, RESPONSE_SCHEMA } from '../constants';
import type { DisplayScene, StoryTurn } from '../types';

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment.');
    }
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
  return genAI;
};

const formatHistory = (history: StoryTurn[]): string => {
  if (history.length === 0) return 'No history yet.';
  return history
    .map((turn, i) => `Turn ${i + 1}:\nStory: ${turn.story}\nPlayer chose: "${turn.choice}"`)
    .join('\n\n');
};

// Generate a placeholder image URL using a placeholder service
const generateImageUrl = (imagePrompt: string): string => {
  // Using placeholder with cozy synthwave colors
  const seed = encodeURIComponent(imagePrompt.slice(0, 50));
  return `https://placehold.co/800x400/0d0221/00ffff?text=🌙+${seed}`;
};

export const getNextScene = async (
  history: StoryTurn[],
  choice: string,
  score: number
): Promise<DisplayScene> => {
  const ai = getGenAI();

  const prompt = history.length === 0
    ? INITIAL_PROMPT
    : getFollowUpPrompt(formatHistory(history), choice, score);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response text received from Gemini');
    }

    const sceneData = JSON.parse(text);

    // Validate required fields
    if (!sceneData.story || !sceneData.choices || !Array.isArray(sceneData.choices)) {
      throw new Error('Invalid response structure from Gemini');
    }

    // Generate an image URL from the prompt
    const imageUrl = generateImageUrl(sceneData.image_prompt || 'cozy synthwave scene');

    return {
      story: sceneData.story,
      image_prompt: sceneData.image_prompt || '',
      choices: sceneData.choices.slice(0, 3), // Ensure max 3 choices
      feedback: sceneData.feedback || 'NICE!',
      score_change: Math.max(0, sceneData.score_change || 0), // No negative scores
      imageUrl,
    };
  } catch (error) {
    console.error('Gemini API error:', error);

    // Return a fallback scene for demo purposes
    return getFallbackScene(history.length);
  }
};

// Fallback scenes for when API is unavailable
const getFallbackScene = (turnCount: number): DisplayScene => {
  const fallbackScenes: DisplayScene[] = [
    {
      story: "You open your eyes slowly. The morning light filters through the curtains, painting soft patterns on the wall. There's no rush. Just breathe.",
      image_prompt: "cozy bedroom morning light synthwave",
      choices: [
        "Stretch gently in bed",
        "Take three deep breaths",
        "Think of one good thing about today"
      ],
      feedback: "GOOD MORNING",
      score_change: 10,
      imageUrl: "https://placehold.co/800x400/0d0221/ff00ff?text=🌅+Morning+Light"
    },
    {
      story: "You feel more awake now. Your body thanks you for the gentle start. The day feels manageable from here.",
      image_prompt: "cozy room calm morning synthwave aesthetic",
      choices: [
        "Get up and stretch some more",
        "Check your phone mindfully",
        "Plan one small task for later"
      ],
      feedback: "NICE PACE",
      score_change: 25,
      imageUrl: "https://placehold.co/800x400/0d0221/00ffff?text=🧘+Calm+Start"
    },
    {
      story: "Each small step matters. You're building momentum, one gentle choice at a time. Your nervous system appreciates the calm approach.",
      image_prompt: "peaceful synthwave room glowing softly",
      choices: [
        "Continue with your morning routine",
        "Take a short break and rest",
        "Make a simple to-do list"
      ],
      feedback: "FLOWING",
      score_change: 30,
      imageUrl: "https://placehold.co/800x400/0d0221/ffff00?text=✨+Momentum"
    }
  ];

  return fallbackScenes[Math.min(turnCount, fallbackScenes.length - 1)];
};

export default { getNextScene };
