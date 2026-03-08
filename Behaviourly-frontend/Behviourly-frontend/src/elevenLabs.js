/**
 * Text-to-speech for interview questions.
 * Uses the browser's Speech Synthesis API (no API key required).
 * Replace with ElevenLabs API when you have credentials.
 */
export function speakText(text) {
  if (!text || typeof text !== "string") return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
