# Feature: AI Classification Service

- **Git Branch**: `feature/ai`
- **Primary Service**: `backend/services/triageService.js` (`triageStudentWithGemini`)
- **Key Task**: Integrate Gemini API via `@google/genai` or Google GenAI SDK when ready.
- **Rule**: Never expose API keys to the frontend. Return the exact JSON schema defined in `triageStudentMock`.
