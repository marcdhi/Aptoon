import { NextRequest, NextResponse } from 'next/server';

const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const video = formData.get('video') as File;
    
    if (!video) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Create a new FormData instance for the Python backend
    const pythonFormData = new FormData();
    pythonFormData.append('video', video);
    pythonFormData.append('rows', formData.get('rows') as string || '2');
    pythonFormData.append('cols', formData.get('cols') as string || '2');
    pythonFormData.append('min_scene_change', formData.get('min_scene_change') as string || '30.0');

    // Forward the request to Python backend
    const response = await fetch(`${PYTHON_API_URL}/api/video/convert`, {
      method: 'POST',
      body: pythonFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || 'Failed to convert video');
    }

    const data = await response.blob();
    
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error in video conversion:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to convert video' },
      { status: 500 }
    );
  }
} 