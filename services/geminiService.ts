import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, INITIAL_PROMPT, getFollowUpPrompt, RESPONSE_SCHEMA } from "../constants";
import type { Scene, DisplayScene, StoryTurn } from "../types";

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || "";

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function getNextScene(
  history: StoryTurn[],
  choice: string,
  score: number
): Promise<DisplayScene> {
  const historyText = history
    .map((turn) => `Scene: ${turn.story}\nPlayer chose: ${turn.choice}`)
    .join("\n---\n");

  const prompt = history.length === 0
    ? INITIAL_PROMPT
    : getFollowUpPrompt(historyText, choice, score);

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  const text = response.text || "";
  const sceneData: Scene = JSON.parse(text);

  // Generate image using Imagen
  let imageUrl = "";
  try {
    const imageResponse = await genAI.models.generateImages({
      model: "imagen-3.0-generate-002",
      prompt: sceneData.image_prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "16:9",
      },
    });

    if (imageResponse.generatedImages?.[0]?.image?.imageBytes) {
      imageUrl = `data:image/png;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
    }
  } catch (err) {
    console.error("Image generation failed:", err);
    // Fallback - continue without image
  }

  return {
    ...sceneData,
    imageUrl,
  };
}
