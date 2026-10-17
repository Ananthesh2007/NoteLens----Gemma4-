<!-- Save this file as CLAUDE.md in the NoteLens project root. Claude Code reads it automatically. -->

# Instructions for Claude Code

This file is the complete project plan for NoteLens. Read all of it before writing code.

- Build exactly what the plan describes: two screens, one upload endpoint, AI-generated study material.
- Priority: get image upload → backend → AI → results working end to end before adding anything else.
- Never put the API key in frontend code. Keep it in `backend/.env`, exclude `.env` from Git, and maintain `.env.example`.
- No login, payments, databases, user profiles, voice features, or complex dashboards.
- Show errors visibly: invalid file, oversized file, API failure, unreadable image.
- Keep code simple and readable. This is a six-hour MVP.
- Follow the folder structure in section 3 and the API design in section 10.
- The AI prompt in section 9 belongs in `backend/app/ai/prompts.py`.
- Done means every item in the testing checklist (section 11) passes.

Commands:

- Frontend (from `frontend/`): `npm install`, `npm run dev`
- Backend (from `backend/`, venv active): `pip install -r requirements.txt`, `uvicorn app.main:app --reload`

---

# NoteLens

## Complete Hackathon Project Plan

**Team of 3 | Six-hour build | 9:15 AM–3:15 PM**

> **Project objective**
> Build a website where students upload an image of study notes and receive an AI-generated explanation, summary, important points, and five practice questions with answers.

---

## 1. Project Features

- **Image upload:** Students upload a photo of handwritten or printed notes.
- **AI explanation and summary:** Convert the uploaded notes into easy-to-understand study material.
- **Important points:** Display the main definitions, facts and concepts.
- **Practice quiz:** Generate five questions and their answers from the notes.

## 2. Technology Stack

| Component | Technology |
|---|---|
| **Frontend** | React, HTML, CSS, JavaScript |
| **Backend** | Python, FastAPI |
| **AI** | Multimodal model/API permitted by the hackathon |
| **API connection** | HTTP requests |
| **Editor** | Visual Studio Code |
| **Version control** | Git and GitHub |

> **Important:** Confirm access to the required AI model/API at the beginning. Test the selected model before relying on it.

## 3. Complete Folder Structure

```
NoteLens/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── ExplanationCard.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── KeyPointsCard.jsx
│   │   │   └── QuizCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   └── notes.py
│   │   ├── ai/
│   │   │   ├── model.py
│   │   │   └── prompts.py
│   │   └── services/
│   │   │   └── image_processing.py
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
├── docs/
│   └── architecture.md
├── README.md
├── LICENSE
└── .gitignore
```

## 4. Website Screens

### Screen 1 — Home Page

- NoteLens title and short tagline
- Image upload area and image preview
- Generate Study Material button
- Loading and error messages when needed

### Screen 2 — Results Page

- Simple explanation
- Quick summary
- Important points
- Five practice questions with answers

Keep the application to two main screens. Login, payments, databases and user profiles are not required for the six-hour MVP.

## 5. Setup Instructions

### Step 1 — Install software

- Visual Studio Code: https://code.visualstudio.com/
- Node.js: https://nodejs.org/
- Python: https://www.python.org/downloads/
- Git: https://git-scm.com/downloads/
- Create or verify GitHub access and access to the permitted AI API.

### Step 2 — Create the frontend

Run in the VS Code terminal:

```bash
mkdir NoteLens
cd NoteLens
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### Step 3 — Create the backend

```bash
mkdir backend
cd backend
python -m venv .venv
```

Activate the environment:

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate
```

Install packages:

```bash
pip install fastapi "uvicorn[standard]" python-multipart python-dotenv
pip freeze > requirements.txt
```

### Step 4 — Run the applications

Frontend, from the `frontend` directory:

```bash
npm run dev
```

Backend, from the `backend` directory after creating `app/main.py`:

```bash
uvicorn app.main:app --reload
```

The backend documentation is normally available at http://127.0.0.1:8000/docs.

## 6. Member 1 — Frontend Timetable

**Responsibility:** React, website design, image upload and results display.

- 9:15–9:35 — Create the React project and basic page layout.
- 9:35–10:15 — Build Navbar, home page and image upload.
- 10:15–11:00 — Add image preview and Generate button.
- 11:00–11:45 — Build explanation, summary and important-points cards.
- 11:45–12:15 — Build the practice quiz display.
- 12:15–12:45 — Add loading indicators and error messages.
- 12:45–1:15 — Test responsive layout and visual consistency.
- 1:15–1:45 — Polish spacing, colours and readability.
- 1:45–2:15 — Fix high-priority frontend bugs.
- 2:15–2:45 — Run and verify frontend with the backend.
- 2:45–3:00 — Prepare the upload screen for the demo.
- 3:00–3:15 — Confirm the website works for submission.

**Final deliverable:** Responsive website, image preview and results display.

## 7. Member 2 — AI Integration Timetable

**Responsibility:** Model/API access, prompts and AI-generated study material.

- 9:15–9:35 — Confirm AI API access and test one request.
- 9:35–10:15 — Prepare prompts for explanations and summaries.
- 10:15–11:00 — Connect the model to the backend.
- 11:00–11:45 — Generate explanations, summaries and important points.
- 11:45–12:15 — Generate five questions with answers.
- 12:15–12:45 — Improve prompts and handle unclear images.
- 12:45–1:15 — Test at least two different note images.
- 1:15–1:45 — Improve output quality and consistency.
- 1:45–2:15 — Fix high-priority AI issues.
- 2:15–2:45 — Verify final AI configuration and output.
- 2:45–3:00 — Prepare a tested sample image and demo results.
- 3:00–3:15 — Confirm AI functionality during submission.

**Final deliverable:** Functioning AI analysis and all four study-material sections.

## 8. Member 3 — Backend, Integration and GitHub Timetable

**Responsibility:** Python backend, API connection, testing, documentation and submission.

- 9:15–9:35 — Create backend folder, GitHub repository and README.
- 9:35–10:15 — Set up FastAPI and image upload endpoint.
- 10:15–11:00 — Validate images and return an AI response.
- 11:00–11:45 — Connect the frontend using `api.js`.
- 11:45–12:15 — Validate response format and quiz data.
- 12:15–12:45 — Test invalid files and API failures.
- 12:45–1:15 — Fix integration bugs.
- 1:15–1:45 — Complete README, LICENSE and `.gitignore`.
- 1:45–2:15 — Verify setup instructions and GitHub commits.
- 2:15–2:45 — Verify public repository and final setup.
- 2:45–3:00 — Rehearse the demo and prepare a fallback.
- 3:00–3:15 — Confirm repository and complete submission.

**Final deliverable:** Working backend, integration, documentation and public GitHub repository.

## 9. AI Prompt

```text
You are NoteLens, an AI study assistant.

Analyse the uploaded image of study notes.

Return these four sections:

1. Explanation
Explain the concepts in clear, student-friendly language.

2. Summary
Provide a concise summary of the content.

3. Important Points
List the key definitions, facts and concepts.

4. Practice Questions
Generate five questions based on the uploaded notes.
Provide an answer for every question.

Instructions:
- Stay grounded in the uploaded notes.
- Do not invent details that are not supported by the image.
- If some text is unreadable, state that clearly.
- Keep the output organised and easy to revise.
```

## 10. Backend API Design

| Endpoint | Function |
|---|---|
| **GET /** | Check that the backend is running |
| **POST /api/notes/analyse** | Accept an image and return study material |

- Validate the uploaded image and file size.
- Call the permitted AI API.
- Handle API failures and unclear images.
- Return structured study material to the frontend.

> **Security:** Store the API key in `backend/.env` and exclude `.env` from `.gitignore`. Never put a private API key in frontend code.

## 11. Final Testing Checklist

- [ ] Frontend starts correctly
- [ ] Backend starts correctly
- [ ] Image upload and preview work
- [ ] Backend receives the image
- [ ] AI explanation is displayed
- [ ] Summary is displayed
- [ ] Important points are displayed
- [ ] Five questions and answers are displayed
- [ ] Loading state works
- [ ] Invalid image displays an error
- [ ] API failure displays an error
- [ ] API key is not exposed in frontend
- [ ] `.env` is excluded from Git
- [ ] README and LICENSE are present
- [ ] Public GitHub repository is accessible
- [ ] Demo has been rehearsed

## 12. Five-Minute Presentation Plan

| Time | Demonstration |
|---|---|
| **0:00–0:30** | Explain the student problem |
| **0:30–1:00** | Introduce NoteLens and its purpose |
| **1:00–2:00** | Upload a sample notes image |
| **2:00–3:30** | Show explanation, summary, key points and quiz |
| **3:30–4:30** | Explain React, FastAPI and AI integration |
| **4:30–5:00** | Conclude and show the GitHub repository |

## 13. Final Deadlines

- **11:00 AM — First AI response:** An image must travel from the frontend through the backend to the AI and return a response.
- **12:15 PM — Core features:** All four study-material sections should be displayed.
- **1:15 PM — Testing:** Test the full flow and fix integration issues.
- **2:45 PM — Feature freeze:** Stop adding features; verify the build and prepare the demo.
- **3:15 PM — Submission:** Verify the repository and follow the organisers' submission instructions.

## Priority Rule

Make the image-upload-to-AI-results flow work before adding extra features. Avoid login, databases, payment features, voice features and complex dashboards during the six-hour build.
