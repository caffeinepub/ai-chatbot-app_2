# AI Chatbot App

## Current State
New project with no existing application logic.

## Requested Changes (Diff)

### Add
- Bilingual (Hindi + English) AI chatbot frontend app
- Chat interface with scrollable message history
- User message bubbles (right-aligned) and bot message bubbles (left-aligned), styled differently
- Welcoming intro message on app load
- Typing indicator animation while bot "thinks" (simulated delay)
- Quick-reply suggestion buttons for: Earning Tips, Tech Help, Business Ideas, Education (plus Hindi equivalents)
- Text input field with send button
- Pre-programmed bot responses for topics: education, tech, business, earning/income tips
- Language detection: respond in Hindi if user types in Hindi, English otherwise
- Step-by-step guidance format for applicable answers

### Modify
- None

### Remove
- None

## Implementation Plan
1. Create chatbot response engine (frontend logic) with topic keyword matching and language detection
2. Build Chat UI component with message bubbles, scrollable history, typing indicator
3. Build QuickReply button bar with bilingual topic labels
4. Build InputBar component with text input and send button
5. Wire everything together in App with state management (messages, loading state)
6. Add welcome message on mount
7. Ensure smooth scroll to latest message on new messages
