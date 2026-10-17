from fastapi import APIRouter, UploadFile, File
from app.services.image_processing import validate_and_process_image
from app.ai.model import generate_study_material, check_ollama_status

router = APIRouter(prefix="/api/notes", tags=["notes"])


@router.get("/health")
async def health_check():
    """Diagnostic endpoint checking Ollama daemon and gemma4:e4b model status."""
    ollama_info = await check_ollama_status()
    return {
        "status": "healthy",
        "ollama": ollama_info
    }


@router.post("/analyse")
async def analyse_notes(file: UploadFile = File(...)):
    """
    Accepts an uploaded image of study notes, validates and processes it,
    sends it to local Ollama gemma4:e4b model, and returns structured study material.
    """
    # 1. Validate image format, size, and extract base64 string
    base64_image = await validate_and_process_image(file)

    # 2. Call local Ollama gemma4:e4b multimodal vision inference
    study_material = await generate_study_material(base64_image)

    # 3. Return structured payload to frontend
    return {
        "success": True,
        "filename": file.filename,
        "data": study_material
    }
