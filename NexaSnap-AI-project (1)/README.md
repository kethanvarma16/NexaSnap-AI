# NexaSnap AI – Intelligent AI for Snapdragon PCs

NexaSnap AI is a student-focused AI assistant designed for Snapdragon-powered Windows PCs.

## What it does

- Ask questions and get simple explanations
- Analyze screenshots/images through an AI-ready workflow
- Summarize study material
- Provide step-by-step learning help
- Show whether a task is using a local/on-device or demo processing path
- Provide a foundation for Snapdragon AI/NPU optimized model integration

## Project structure

```text
NexaSnap-AI/
├── frontend/          # React + Vite interface
├── backend/           # FastAPI service
├── .gitignore
└── README.md
```

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://127.0.0.1:8000`.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Snapdragon AI direction

The application is designed around an on-device AI workflow. During the next implementation stage, a compatible optimized model can be connected through the Snapdragon/Qualcomm AI software stack on supported Snapdragon PCs. The current prototype deliberately keeps the model adapter separate from the UI so that a local model can be added without redesigning the application.

The repository does not claim benchmark results or NPU acceleration until they are measured on compatible Snapdragon hardware.

## Status

Prototype / active development.
