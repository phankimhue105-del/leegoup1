export function speakText(
  text: string,
  onEnd?: () => void,
  rate = 0.9,
  pitch = 1.1
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return false;
  }

  window.speechSynthesis.cancel(); // Stop any ongoing speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Slightly slower for young ESL kids
  utterance.pitch = pitch; // Cheerful friendly pitch
  utterance.lang = 'en-US';

  // Pick clear US English voice if available
  const voices = window.speechSynthesis.getVoices();
  const usVoice = voices.find(
    (v) => v.lang === 'en-US' || v.lang.startsWith('en')
  );
  if (usVoice) {
    utterance.voice = usVoice;
  }

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
