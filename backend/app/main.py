import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.notes import router as notes_router
from app.ai.model import OLLAMA_BASE_URL, OLLAMA_MODEL

# Load environment variables from .env
load_dotenv()

app = FastAPI(
    title="NoteLens API",
    description="Backend service for NoteLens AI Study Assistant powered by local Gemma 4 E4B",
    version="1.0.0"
)

# Enable CORS for frontend requests
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include notes analysis routes
app.include_router(notes_router)


@app.get("/")
async def root():
    """Root endpoint to check backend status and configured AI model."""
    return {
        "status": "online",
        "service": "NoteLens API",
        "ai_engine": "Ollama (Local)",
        "model": OLLAMA_MODEL,
        "ollama_base_url": OLLAMA_BASE_URL
    }
