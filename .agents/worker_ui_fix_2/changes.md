# Changes Made

This document details the exact changes implemented to address the UI rendering and safety bugs.

## 1. CSS Refactoring (`src/index.css`)
- **Header Alignment**: Replaced `left: 50%; transform: translateX(-50%)` in `.header-wrapper` with a physical centering layout using `left: 0; right: 0; margin: 0 auto;`. This eliminates rendering misalignment in large viewports where Framer Motion's inline `translateY` interferes with the transform property.
- **Fade Mask Color Gradient**: Redefined the `.fade-mask` gradient background to blend cleanly into the white cards in light mode and deep gray panels in dark mode. 
  - Light mode uses `rgba(255, 255, 255, 0.85)` fading to transparent.
  - Dark mode (`[data-theme='dark']`) uses `rgba(28, 28, 30, 0.85)` fading to transparent.
  - This solves color seam visibility issues.

## 2. Safe Web Speech API in Views (`src/App.jsx`)
- Wrapped all `window.speechSynthesis.cancel()` statements in `DetailView` within strict feature-detecting conditional guards:
  ```javascript
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  ```
- This affects the "Previous POI" navigation, "Next POI" navigation, and "Back" navigation actions inside detail view.

## 3. Safe Web Speech API in Component (`src/components/AudioGuide.jsx`)
- Introduced the constant `hasSpeech`:
  ```javascript
  const hasSpeech = typeof window !== 'undefined' && window.speechSynthesis && window.SpeechSynthesisUtterance;
  ```
- Wrapped the unmount `useEffect` cleanup handler to safely execute only when `hasSpeech` is true.
- Modified the `togglePlay` handler to check for `hasSpeech` as the very first action, raising an alert dialog (`"您的浏览器不支持语音播报功能"`) and terminating early if the API is unsupported. This guards against unhandled TypeErrors.
