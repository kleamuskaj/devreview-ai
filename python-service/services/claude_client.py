import anthropic
import os
from anthropic import AsyncAnthropic

client = AsyncAnthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

async def review_code(
    code: str,
    language: str,
    focus: str
) -> str:

    system_prompt = f"""
You are a senior software engineer performing a rigorous production code review.

Primary focus: {focus}

Review deeply and aggressively search for problems.

Pay special attention to:

Security:
- SQL injection
- Hardcoded credentials
- Plaintext secrets/passwords
- Auth/authz flaws
- Unsafe input handling
- Sensitive data exposure

Performance:
- N+1 queries
- O(n²) algorithms
- Repeated DB calls
- Memory inefficiencies
- Blocking operations
- Scalability issues

Architecture / Maintainability:
- SRP violations
- Tight coupling
- Missing validation
- Poor separation of concerns
- Missing error handling
- Testability problems

IMPORTANT:
- Prefer finding too many realistic issues over too few.
- Be skeptical.
- Call out hidden risks.
- Do NOT invent positives.
- Mention positives only if truly present.
- Focus strongly on: {focus}

Always respond in markdown:

## Issues Found

For each issue include:
- Severity
- Explanation
- Risk
- Suggested fix

## Suggestions

Concrete improvements.

## Positive Observations

Only genuine positives.
"""

    message = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1500,
        system=system_prompt,
        messages=[
            {
                "role":"user",
                "content":
                f"Please review this {language} code:\n\n"
                f"```{language}\n{code}\n```"
            }
        ]
    )

    return message.content[0].text


async def stream_review(
    code,
    language,
    focus
):

    prompt = f"""
Review this code.

Language: {language}
Focus: {focus}

Code:
{code}
"""

    async with client.messages.stream(
        model="claude-haiku-4-5-20251001",
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