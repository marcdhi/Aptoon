import cv2
import numpy as np
from typing import List, Tuple

class VideoProcessor:
    def __init__(self, min_scene_change: float = 30.0):
        """
        Initialize the video processor
        
        Args:
            min_scene_change: Minimum difference between frames to be considered a scene change
        """
        self.min_scene_change = min_scene_change
        
    def extract_key_frames(self, video_path: str) -> List[np.ndarray]:
        """
        Extract key frames from video using scene detection
        
        Args:
            video_path: Path to the video file
            
        Returns:
            List of extracted key frames as numpy arrays
        """
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError(f"Could not open video file: {video_path}")
            
        frames = []
        prev_frame = None
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Convert to grayscale for scene detection
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            if prev_frame is not None:
                # Calculate frame difference
                diff = cv2.absdiff(gray, prev_frame)
                mean_diff = np.mean(diff)
                
                # If significant change, save as key frame
                if mean_diff > self.min_scene_change:
                    frames.append(frame)
            else:
                # Always keep first frame
                frames.append(frame)
                
            prev_frame = gray
            
        cap.release()
        return frames
        
    def create_comic_layout(self, frames: List[np.ndarray], layout_size: Tuple[int, int] = (2, 2)) -> np.ndarray:
        """
        Arrange frames in a comic-style grid layout
        
        Args:
            frames: List of frames to arrange
            layout_size: Tuple of (rows, cols) for the grid layout
            
        Returns:
            Combined image with frames arranged in grid
        """
        if not frames:
            raise ValueError("No frames provided for layout")
            
        rows, cols = layout_size
        frame_height, frame_width = frames[0].shape[:2]
        border = 10  # Border width
        
        # Calculate dimensions including borders
        panel_height = frame_height + 2 * border
        panel_width = frame_width + 2 * border
        
        # Create blank canvas with space for borders
        canvas = np.zeros((panel_height * rows, panel_width * cols, 3), dtype=np.uint8)
        canvas.fill(255)  # White background
        
        # Place frames in grid
        for idx, frame in enumerate(frames[:rows*cols]):
            i, j = idx // cols, idx % cols
            
            # Calculate panel positions including borders
            y1, y2 = i * panel_height, (i + 1) * panel_height
            x1, x2 = j * panel_width, (j + 1) * panel_width
            
            # Add border effect
            frame_with_border = cv2.copyMakeBorder(frame, border, border, border, border, 
                                                 cv2.BORDER_CONSTANT, value=[0, 0, 0])
            
            # Place frame with border
            canvas[y1:y2, x1:x2] = frame_with_border
            
        return canvas
        
    def apply_comic_effect(self, frame: np.ndarray) -> np.ndarray:
        """
        Apply comic-style effects to a frame
        
        Args:
            frame: Input frame
            
        Returns:
            Frame with comic effect applied
        """
        # Preserve original colors but reduce noise
        color = cv2.bilateralFilter(frame, 9, 75, 75)
        
        # Convert to grayscale for edge detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.medianBlur(gray, 7)
        
        # Edge detection
        edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, 
                                    cv2.THRESH_BINARY, 9, 2)
        
        # Enhance edges
        edges = cv2.dilate(edges, None)
        
        # Combine edges with color
        cartoon = cv2.bitwise_and(color, color, mask=edges)
        
        # Enhance contrast
        lab = cv2.cvtColor(cartoon, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        l = clahe.apply(l)
        lab = cv2.merge((l,a,b))
        cartoon = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
        
        return cartoon 