# services/claude_client.py
import anthropic
import os

# Instantiate the client — reads ANTHROPIC_API_KEY from environment automatically
#client = anthropic.Anthropic()
client = AsyncAnthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)
async def review_code(code: str, language: str, focus: str) -> str:
    """
    Sends code to Claude and returns a structured review.
    
    This is a simple synchronous call for now.
    We'll make it async and streaming later.
    """
    
    system_prompt = f"""You are a senior software engineer doing a code review.
You focus on {focus}.
Always respond in structured markdown with sections:
## Issues Found
## Suggestions
## Positive Observations

Be specific, reference line numbers when possible, and be direct."""

    message = await client.messages.create(
        model="claude-sonnet-4-20250514",  # Always use Sonnet 4 — best balance
        max_tokens=1500,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": f"Please review this {language} code:\n\n```{language}\n{code}\n```"
            }
        ]
    )
    
    # The response content is a list of blocks — grab the text from the first one
    return message.content[0].text
    
async def stream_review(code, language, focus):

    prompt = f"""
Review this code.

Language: {language}
Focus: {focus}

Code:
{code}
"""

    async with client.messages.stream(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    ) as stream:

        async for text in stream.text_stream:
            yield text