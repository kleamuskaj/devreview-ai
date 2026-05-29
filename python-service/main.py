from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from services.claude_client import review_code
from fastapi.responses import StreamingResponse
from services.claude_client import review_code, stream_review
import os

load_dotenv()

app = FastAPI(title="DevReview AI", version="0.1.0")

class ReviewRequest(BaseModel):
    code: str
    language: str = "csharp"
    focus: str = "performance"

class ReviewResponse(BaseModel):
    review: str
    language: str
    focus: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/review", response_model=ReviewResponse)
async def create_review(request: ReviewRequest):
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    review_text = await review_code(
        code=request.code,
        language=request.language,
        focus=request.focus
    )

    return ReviewResponse(
        review=review_text,
        language=request.language,
        focus=request.focus
    )
    
@app.post("/review-stream")
async def review_stream(request: ReviewRequest):

    async def generator():

        async for chunk in stream_review(
            request.code,
            request.language,
            request.focus
        ):
            yield chunk

    return StreamingResponse(
        generator(),
        media_type="text/plain"
    )
