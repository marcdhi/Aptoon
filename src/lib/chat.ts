'use server';

import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const OpenAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OpenAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OpenAI_API_KEY,
});

const COMIC_SYSTEM_PROMPT = `You are an expert comic artist and storyteller specializing in gaming narratives. 
Your task is to enhance user prompts to create vivid, detailed comic scenes that capture the essence of gaming moments.
Focus on:
- Dynamic action scenes
- Character expressions and emotions
- Environmental details
- Comic-style text elements (speech bubbles, sound effects)
- Gaming-specific elements (UI elements, power-ups, special effects)
- Cinematic angles and compositions`;

export interface ComicMetadata {
  title: string;
  description: string;
  genre: string;
  mood: string;
  suggestedTags: string[];
}

export async function enhanceComicPrompt(userPrompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: COMIC_SYSTEM_PROMPT },
        { role: "user", content: `Create a detailed, comic-style art prompt based on this gaming moment: "${userPrompt}". 
          Include specific details about composition, art style, text elements, and special effects.` }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || userPrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return userPrompt;
  }
}

export async function generateComicMetadata(imagePrompt: string, generatedImageUrl: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: `You are a comic metadata specialist. Create engaging titles and descriptions for gaming comics.
          Always respond in this exact JSON format:
          {
            "title": "string",
            "description": "string",
            "genre": "string",
            "mood": "string",
            "suggestedTags": ["string"]
          }` 
        },
        { 
          role: "user", 
          content: `Based on this comic scene prompt and generated image, create metadata for the comic:
          
          Prompt: "${imagePrompt}"
          Image URL: ${generatedImageUrl}
          
          Provide:
          1. A catchy, gaming-themed title
          2. An engaging description (2-3 sentences)
          3. Genre (e.g., Action, Adventure, RPG)
          4. Mood (e.g., Epic, Humorous, Intense)
          5. 3-5 relevant tags
          
          Remember to respond ONLY with the JSON object, no other text.`
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    try {
      const metadata = JSON.parse(content.trim());
      return metadata as ComicMetadata;
    } catch (parseError) {
      console.error('Error parsing metadata JSON:', parseError);
      throw parseError;
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Untitled Comic",
      description: "A gaming moment captured in comic form.",
      genre: "Gaming",
      mood: "Dynamic",
      suggestedTags: ["gaming", "comic"]
    };
  }
} 