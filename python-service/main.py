from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from services.claude_client import review_code
import os

load_dotenv()

app = FastAPI(
    title="DevReview AI",
    version="0.1.0"
)

# CORS MUST be immediately after app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://devreview-ai-six.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)