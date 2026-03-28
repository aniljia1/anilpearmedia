# Pear Media AI 🚀

**Creative Studio | Style Lab | Text → Image & Image → Style Analyzer**

Pear Media AI is a full-stack web application that allows users to:

- **Generate cinematic, highly-detailed images** from text prompts.  
- **Analyze the style and characteristics of images** using AI.  

Built with **React (Vite)**, **Node.js**, **Express**, **Tailwind CSS**, and AI models (OpenAI / HuggingFace / Gemini).

---

## Live

- Frontend: https://anilpearmedia.vercel.app/ 
- Backend: https://anilpearmedia.onrender.com/
- Screenrecording: https://drive.google.com/file/d/1qU5Qy1iG_CrR9lcDZxp26X18dyHK6QO2/view?usp=sharing

---

## Features

### Text → Image Generator
- Enter a prompt like `child picture`.
- Click **Enhance Prompt** to generate a cinematic, detailed version.
- Generate an AI image based on the enhanced prompt.
- Download generated images.

### Image → Style Analyzer
- Upload any image (jpg/png).
- AI analyzes main subject, colors, and artistic style.
- Generate variations based on analysis.

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Axios for API requests

**Backend**
- Node.js + Express
- CORS enabled for localhost & Vercel
- dotenv for environment variables
- HuggingFace API for free image generation
- Optional Gemini API (Vision & text enhancement)

---

## Create .env file backend:

PORT=5000
HF_API_KEY=xxxxxxxxxx (when i paste hf_api_token show rule of violence)


---

## ## Create .env file backend:

VITE_API_URL=http://localhost:5000

---

## Installation

# Backend Setup
cd backend
npm init -y
npm install express cors dotenv axios

# Run backend:

npm run dev
or
npm start
or
node src/index.js

run : http://localhost:5000/

# Frontend Setup
cd frontend
npm install
npm install axios lucide-react

# Run frontend:

npm run dev

run : http://localhost:5173/

Deploy: https://anilpearmedia.vercel.app/



