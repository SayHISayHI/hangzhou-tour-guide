import { useState, useEffect } from 'react';
import { Headphones, Square } from 'lucide-react';

export const AudioGuide = ({ title, text }) => {
  const hasSpeech = typeof window !== 'undefined' && window.speechSynthesis && window.SpeechSynthesisUtterance;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (hasSpeech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [hasSpeech]);

  const togglePlay = () => {
    if (!hasSpeech) {
      alert("您的浏览器不支持语音播报功能");
      return;
    }
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // clear previous
      const utterance = new SpeechSynthesisUtterance(title + "。" + text.replace(/\n\n/g, ' '));
      utterance.lang = 'zh-CN';
      utterance.onend = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    }
  };

  return (
    <button 
      className={`audio-btn ${playing ? 'audio-playing' : ''}`}
      onClick={togglePlay}
      aria-label="语音导览"
    >
      {playing ? <Square size={20} fill="currentColor" /> : <Headphones size={20} />}
    </button>
  );
};
