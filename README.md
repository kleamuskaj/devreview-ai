DevReview AI
DevReview AI is an AI-powered code review application that helps developers analyze source code using Claude.
The application provides a web-based code editor where users can submit code, select the programming language and review focus, and receive an AI-generated code review.
Features
AI-powered code reviews using Anthropic Claude
Monaco Editor for writing and editing code
Support for C# and Python code reviews
Multiple review focuses:
Security
Performance
Clean Architecture
Maintainability
Markdown-formatted review results
Copy review results
Export reviews as Markdown
React frontend
ASP.NET Core API gateway
Python FastAPI AI service
Architecture
┌─────────────────────┐
│      React UI       │
│  TypeScript + Vite  │
│     Monaco Editor   │
└──────────┬──────────┘
           │
           │ HTTP
           ▼
┌─────────────────────┐
│    .NET API Gateway │
│      ASP.NET Core   │
└──────────┬──────────┘
           │
           │ HTTP
           ▼
┌─────────────────────┐
│   Python AI Service │
│       FastAPI       │
└──────────┬──────────┘
           │
           │ Anthropic API
           ▼
┌─────────────────────┐
│       Claude        │
│   AI Code Review    │
└─────────────────────┘
Project Structure
devreview-ai/
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.*
│
├── dotnet-gateway/
│   ├── Controllers/
│   │   └── ReviewController.cs
│   ├── Models/
│   │   ├── ReviewRequest.cs
│   │   └── ReviewResponse.cs
│   ├── Services/
│   │   └── PythonReviewClient.cs
│   ├── Program.cs
│   └── ...
│
├── python-service/
│   ├── services/
│   │   └── claude_client.py
│   ├── main.py
│   └── ...
│
└── README.md
Technology Stack
Frontend
React
TypeScript
Vite
Monaco Editor
React Markdown
Backend
.NET
ASP.NET Core
C#
HTTP/REST APIs
AI Service
Python
FastAPI
Pydantic
Anthropic Python SDK
Claude
How It Works
The user opens DevReview AI.
The user selects a programming language.
The user selects a review focus.
The user enters or pastes source code into the Monaco editor.
The frontend sends the review request to the backend.
The .NET API communicates with the Python AI service.
The Python service sends the code and review instructions to Claude.
Claude analyzes the code and generates a review.
The review is returned to the application.
The frontend renders the result as Markdown.
Supported Languages
Currently supported:
C#
Python
The architecture is designed so additional programming languages can be added later.
Review Focuses
Security
Looks for potential security problems and unsafe coding practices.
Performance
Looks for inefficient algorithms, expensive operations, unnecessary allocations, database-related concerns, and other potential performance problems.
Clean Architecture
Reviews separation of concerns, dependencies, abstraction, layering, and architectural design.
Maintainability
Reviews readability, complexity, duplication, naming, organization, and long-term maintainability.
Prerequisites
Make sure the following are installed:
Node.js
.NET SDK
Python 3.10+
An Anthropic API key
Running the Project Locally
1. Clone the repository
git clone <repository-url>
cd devreview-ai
2. Start the Python AI service
Navigate to the Python service:
cd python-service
Create and activate a virtual environment:
python -m venv .venv
Windows:
.venv\Scripts\activate
Linux/macOS:
source .venv/bin/activate
Install dependencies:
pip install -r requirements.txt
Set the Anthropic API key:
ANTHROPIC_API_KEY=your-api-key
Start the FastAPI service:
uvicorn main:app --reload
The API will normally be available at:
http://localhost:8000
Swagger/OpenAPI documentation:
http://localhost:8000/docs
3. Start the .NET API
Navigate to the .NET gateway:
cd dotnet-gateway
Restore dependencies:
dotnet restore
Run the application:
dotnet run
The ASP.NET Core API will start on the configured local port.
Swagger documentation is available when Swagger is enabled by the application.
4. Start the React frontend
Navigate to the frontend:
cd frontend
Install dependencies:
npm install
Start the development server:
npm run dev
Open the URL displayed by Vite in your browser.
Environment Variables
The Python AI service requires an Anthropic API key.
Example:
ANTHROPIC_API_KEY=your-api-key
Keep API keys outside the source code and do not commit secrets to Git.
API Overview
The application exposes review functionality through the backend services.
A review request contains information such as:
{
  "language": "csharp",
  "focus": "security",
  "code": "..."
}
The service processes the request and returns an AI-generated code review.
Example Use Case
A developer can paste:
public User GetUser(int id)
{
    return repository.GetUser(id);
}
Select:
Language: C#
Focus: Security
DevReview AI sends the code to Claude and presents the resulting analysis in the frontend.
Purpose
DevReview AI is designed as an AI-assisted development tool that combines modern web development with large language models to provide automated code review and development feedback.
The project also serves as an example of integrating:
React
ASP.NET Core
Python/FastAPI
Anthropic Claude
AI-assisted developer tooling
Future Direction
Potential future capabilities include:
Additional programming languages
GitHub/GitLab integration
Pull request reviews
Repository-level analysis
Streaming AI responses
Code quality scoring
Review history
Automated static analysis
AI-powered refactoring suggestions
Team and organization support
