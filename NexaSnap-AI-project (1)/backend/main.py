from typing import Optional
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="NexaSnap AI API",
    description="Backend API for the NexaSnap AI Snapdragon PC assistant.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str
    mode: str = "study"


@app.get("/")
def root():
    return {
        "app": "NexaSnap AI",
        "status": "running",
        "message": "NexaSnap AI backend is ready.",
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "app": "NexaSnap AI",
        "ai_mode": "prototype",
        "snapdragon_ready": True,
    }


@app.post("/api/ask")
def ask(request: AskRequest):
    question = request.question.strip()

    if not question:
        return {
            "answer": "Please enter a question.",
            "mode": request.mode,
            "processing": "local prototype",
        }

    # Prototype response. This adapter is intentionally separated from the UI.
    # A Snapdragon-compatible local model can replace this section later.
    answer = (
        f"Here is a simple explanation for your question: \"{question}\"\\n\\n"
        "NexaSnap AI is currently running in prototype mode. "
        "The next integration step is to connect a compatible on-device AI model "
        "so supported workloads can run locally on Snapdragon hardware."
    )

    return {
        "answer": answer,
        "mode": request.mode,
        "processing": "local prototype",
        "snapdragon_path": "AI/NPU model adapter ready for integration",
    }


@app.post("/api/analyze-image")
async def analyze_image(file: Optional[UploadFile] = File(None)):
    if file is None:
        return {"error": "No image uploaded."}

    return {
        "filename": file.filename,
        "answer": (
            "Image received successfully. In the next model-integration stage, "
            "a compatible vision model will analyze the image locally where supported."
        ),
        "processing": "prototype",
    }
