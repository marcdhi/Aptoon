'use server';

import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const OpenAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OpenAI_API_KEY);

if (!OpenAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OpenAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development, use API routes in production
});

export interface GenerateImageOptions {
  prompt: string;
  n?: number;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  background?: 'transparent' | 'opaque' | 'auto';
  output_format?: 'png' | 'jpeg' | 'webp';
}

export interface GenerateImageResponse {
  base64Image: string;
  format: string;
}

export async function generateImage({
  prompt,
  n = 1,
  size = '1024x1024',
  background = 'auto',
  output_format = 'png'
}: GenerateImageOptions): Promise<GenerateImageResponse> {
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      background,
      output_format
    });

    if (!response.data?.[0]?.b64_json) {
      throw new Error('No image data in response');
    }

    return {
      base64Image: response.data[0].b64_json,
      format: output_format
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
} 