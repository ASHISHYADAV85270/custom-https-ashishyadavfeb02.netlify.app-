# Ashish Yadav Portfolio

Modern React portfolio with:
- Hero, skills, projects, experience, design systems, and architecture highlights
- CV-driven impact metrics and professional profile content
- AI chatbot UI connected to a backend `/api/chat` endpoint

## Run locally

1. Install dependencies:
   - `npm install`
2. Create env file:
   - `cp .env.example .env`
3. Add your OpenAI key in `.env`:
   - `OPENAI_API_KEY=...`
   - Optional OpenRouter setup:
     - `OPENAI_BASE_URL=https://openrouter.ai/api/v1`
     - `OPENAI_MODEL=openai/gpt-4o-mini`
     - `OPENROUTER_SITE_URL=http://localhost:5173`
     - `OPENROUTER_APP_NAME=Ashish Portfolio`
4. Start frontend + API together:
   - `npm run dev`

Frontend runs on Vite default port and chatbot API runs on `http://localhost:8787`.

### Optional chatbot toggle

- `VITE_ENABLE_CHATBOT=true` to show chatbot
- `VITE_ENABLE_CHATBOT=false` to hide chatbot

## Deploy on Netlify

`.env` is not uploaded to Git (it is gitignored). Netlify only sees variables you add in the dashboard.

1. In Netlify: **Site configuration → Environment variables**
2. Add each variable from `.env.example` that starts with `VITE_` (names must match exactly).
3. **Deploy → Trigger deploy** (or push a commit). Vite bakes env vars in at **build time**, so changing variables requires a new deploy.

| Variable | Example |
|----------|---------|
| `VITE_CV_URL` | Google Drive share link |
| `VITE_INTRO_VIDEO_URL` | YouTube embed URL |
| `VITE_ENABLE_CHATBOT` | `false` |
| `VITE_CHAT_API_URL` | Leave empty unless you host the chat API |

**Common mistakes**

- Using `INTRO_VIDEO_URL` without the `VITE_` prefix (Vite will ignore it).
- Expecting `OPENAI_API_KEY` to work on static hosting — the Express server in `server/` does not run on Netlify unless you add Netlify Functions separately.
- Forgetting to redeploy after adding or changing variables.

## Scripts

- `npm run dev` - run both web and API
- `npm run dev:web` - run only Vite frontend
- `npm run dev:api` - run only chat API backend
- `npm run build` - production build
- `npm run lint` - ESLint checks
