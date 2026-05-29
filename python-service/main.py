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

class ReviewRequest(BaseModel):
    code: str
    language: str = "csharp"
    focus: str = "best practices"

class ReviewResponse(BaseModel):
    review: str
    language: str
    focus: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/review", response_model=ReviewResponse)
def create_review(request: ReviewRequest):
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")
    review_text = review_code(
        code=request.code,
        language=request.language,
        focus=request.focus
    )
    return ReviewResponse(
        review=review_text,
        language=request.language,
        focus=request.focus
    )