import base64
import io
import os
from PIL import Image
from fastapi import HTTPException, UploadFile

ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg"
}

MAX_FILE_SIZE_MB = int(os.getenv("MAX_UPLOAD_SIZE_MB", 10))
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024


async def validate_and_process_image(file: UploadFile) -> str:
    """
    Validates uploaded image MIME type, file size, and corruptions.
    Returns base64 encoded string compatible with Ollama vision input.
    """
    # 1. Validate content type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file format '{file.content_type}'. Please upload a PNG, JPG, JPEG, or WEBP image."
        )

    # 2. Read bytes and validate file size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds the maximum allowed size of {MAX_FILE_SIZE_MB}MB."
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty. Please select a valid notes image."
        )

    # 3. Verify image integrity with Pillow
    try:
        image = Image.open(io.BytesIO(contents))
        image.verify()  # Verify that it is, in fact, an image
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file appears to be corrupted or is not a valid image."
        )

    # Re-open image for processing (verify closes/invalidates the image object)
    image = Image.open(io.BytesIO(contents))

    # Convert RGBA/P/CMYK to RGB if saving as JPEG or standardizing
    if image.mode in ("RGBA", "P", "CMYK"):
        image = image.convert("RGB")

    # Resize if extremely large to prevent Ollama out-of-memory or high latency
    max_dimension = 2048
    if max(image.size) > max_dimension:
        image.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)

    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=90)
    processed_bytes = buffer.getvalue()

    # 4. Return base64 string for Ollama
    base64_str = base64.b64encode(processed_bytes).decode("utf-8")
    return base64_str
