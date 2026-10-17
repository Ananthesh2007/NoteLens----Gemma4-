# NoteLens - AI Study Assistant

> Turn your handwritten or printed study notes into clear explanations, summaries, important points, and practice quizzes in seconds — powered 100% locally by **Ollama and Gemma 4 E4B (`gemma4:e4b`)**. No cloud AI API keys required.

---

## 🌟 Features

- **📸 Image Upload & Preview:** Drag & drop handwritten or printed notes with real-time preview, metadata, and validation.
- **💡 Concept Explanation:** Clear, student-friendly explanation of core principles.
- **📌 Quick Summary (TL;DR):** High-contrast highlight box summarizing essential concepts.
- **🔑 Key Points & Definitions:** Numbered exam takeaways and critical definitions.
- **🧠 Interactive Practice Quiz:** 5 targeted questions with active-recall answer reveals.
- **🛡️ 100% Private & Local:** All multimodal image inference runs locally on your machine via Ollama.

---

## 🏗️ Architecture

```
NoteLens/
├── frontend/               # React + Vite UI
│   ├── src/
│   │   ├── components/     # Navbar, ImageUpload, Cards (Summary, Explanation, Points, Quiz)
│   │   ├── pages/          # Home (Screen 1) & Results (Screen 2)
│   │   └── services/       # api.js (HTTP communication with FastAPI)
├── backend/                # Python FastAPI Backend
│   ├── app/
│   │   ├── main.py         # FastAPI application with CORS
│   │   ├── routes/         # POST /api/notes/analyse & GET /api/notes/health
│   │   ├── ai/             # Ollama client and prompt engineering
│   │   └── services/       # Image processing & validation with Pillow
│   ├── requirements.txt
│   └── .env.example
├── CLAUDE.md               # Complete Hackathon Project Plan
└── LICENSE                 # MIT License
```

---

## 🚀 Getting Started (Windows 11)

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **Ollama for Windows** (https://ollama.com)

### 2. Prepare Local AI Model (Ollama)
Ensure Ollama is running and download the `gemma4:e4b` multimodal vision model:

```powershell
ollama pull gemma4:e4b
```

Verify that the model is installed:
```powershell
ollama list
```

### 3. Run Backend (FastAPI)
Open a terminal in `backend/`:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Backend API docs will be available at: http://127.0.0.1:8000/docs

### 4. Run Frontend (React + Vite)
Open a new terminal in `frontend/`:

```powershell
cd frontend
npm install
npm run dev
```
Frontend will be available at: http://localhost:5173

---

## 🔒 Security & Privacy
- Zero cloud AI dependencies or API keys required.
- Image files are validated and processed in memory.
- Backend configuration is managed via `backend/.env`.
