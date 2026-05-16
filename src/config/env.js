/**
 * Vite only exposes env vars prefixed with VITE_ to the client.
 * On Netlify: Site settings → Environment variables → add each VITE_* var,
 * then trigger a new deploy (values are baked in at build time).
 */
const introVideoFallback =
  'https://www.youtube.com/embed/YowK53KH6Ic?si=V6Rt3sG8MsYha2mk&start=9'

export const env = {
  cvUrl: (import.meta.env.VITE_CV_URL ?? '').trim(),
  introVideoUrl:
    (import.meta.env.VITE_INTRO_VIDEO_URL ?? '').trim() || introVideoFallback,
  enableChatbot: import.meta.env.VITE_ENABLE_CHATBOT === 'true',
  chatApiUrl: (import.meta.env.VITE_CHAT_API_URL ?? '').trim(),
}
