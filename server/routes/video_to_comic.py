from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
import os
import cv2
import numpy as np
from utils.video_processor import VideoProcessor
import tempfile
from typing import Optional
import logging
import shutil

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Create a dedicated temp directory in the server root
TEMP_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp"))
os.makedirs(TEMP_DIR, exist_ok=True)

def cleanup_temp_files(*file_paths):
    """
    Cleanup temporary files after response is sent
    """
    for path in file_paths:
        try:
            if os.path.exists(path):
                os.unlink(path)
                logger.info(f"Cleaned up temporary file: {path}")
        except Exception as e:
            logger.error(f"Error cleaning up file {path}: {str(e)}")

@router.post("/convert")
async def create_comic_from_video(
    background_tasks: BackgroundTasks,
    video: UploadFile = File(...),
    rows: Optional[int] = 2,
    cols: Optional[int] = 2,
    min_scene_change: Optional[float] = 30.0
):
    """
    Convert uploaded video to comic-style image
    """
    logger.info(f"Received video: {video.filename}, size: {video.size}, content_type: {video.content_type}")
    
    # Validate video file type
    if not video.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")

    # Create unique filenames for temporary files
    temp_video_path = os.path.join(TEMP_DIR, f"temp_video_{os.urandom(8).hex()}_{video.filename}")
    temp_comic_path = os.path.join(TEMP_DIR, f"comic_{os.urandom(8).hex()}.jpg")
    
    try:
        logger.info(f"Saving uploaded video to {temp_video_path}")
        # Save uploaded video
        with open(temp_video_path, "wb") as buffer:
            content = await video.read()
            buffer.write(content)
        
        logger.info("Initializing video processor...")
        # Initialize video processor
        processor = VideoProcessor(min_scene_change=min_scene_change)
        
        logger.info("Extracting key frames...")
        # Extract key frames
        frames = processor.extract_key_frames(temp_video_path)
        
        if not frames:
            raise HTTPException(status_code=400, detail="No frames could be extracted from the video")
        
        logger.info(f"Extracted {len(frames)} key frames")
            
        logger.info("Applying comic effect...")
        # Apply comic effect to each frame
        comic_frames = [processor.apply_comic_effect(frame) for frame in frames]
        
        logger.info("Creating comic layout...")
        # Create comic layout
        comic = processor.create_comic_layout(comic_frames, layout_size=(rows, cols))
        
        logger.info(f"Saving result to {temp_comic_path}")
        # Save result
        cv2.imwrite(temp_comic_path, comic)
        
        if not os.path.exists(temp_comic_path):
            raise HTTPException(status_code=500, detail="Failed to save comic image")
        
        # Schedule cleanup after response is sent
        background_tasks.add_task(cleanup_temp_files, temp_video_path, temp_comic_path)
        
        logger.info("Returning comic image...")
        # Return the comic image
        return FileResponse(
            temp_comic_path,
            media_type="image/jpeg",
            filename=f"comic_{video.filename}.jpg"
        )
        
    except Exception as e:
        # Clean up files immediately if there's an error
        cleanup_temp_files(temp_video_path, temp_comic_path)
        logger.error(f"Error processing video: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
async def get_status():
    """
    Simple status endpoint to verify API is working
    """
    return JSONResponse({"status": "Video to Comic conversion API is running"}) 