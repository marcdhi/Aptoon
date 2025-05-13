'use server';

import { fal } from "@fal-ai/client";

if (!process.env.FAL_KEY) {
  throw new Error('FAL_KEY is not set');
}

// Configure FAL.ai client
fal.config({
  credentials: process.env.FAL_KEY
});

export interface GenerateImageOptions {
  prompt: string;
  n?: number;
  size?: 'square_hd' | 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9' | { width: number; height: number };
}

export interface GenerateImageResponse {
  imageUrl: string;
  format: string;
}

export async function generateImage({
  prompt,
  n = 1,
  size = 'square_hd'
}: GenerateImageOptions): Promise<GenerateImageResponse> {
  try {
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: `Create a dynamic comic-style scene with vibrant colors, bold outlines, and dramatic lighting. Include comic elements like speech bubbles, action lines, and sound effects where appropriate. Scene details: ${prompt}`,
        image_size: size,
        num_images: n,
        enable_safety_checker: true,
      },
    });

    if (!result.data.images?.[0]?.url) {
      throw new Error('No image URL in response');
    }

    return {
      imageUrl: result.data.images[0].url,
      format: 'jpeg' // FAL.ai returns JPEG images by default
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
} 