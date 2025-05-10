from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.video_to_comic import router as video_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(video_router, prefix="/api/video", tags=["video"])

@app.get("/")
async def root():
    return {"message": "Video to Comic API is running"} 