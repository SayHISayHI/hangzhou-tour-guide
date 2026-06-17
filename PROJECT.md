# Project: Hangzhou Tour Guide UI Refactoring & Aesthetic Optimization

## Architecture
- Frontend: React (Vite)
- Styles: Native CSS (`src/index.css`)
- Component hierarchy:
  - `src/App.jsx`
  - `src/components/Header.jsx`
  - `src/components/AmbientBlobs.jsx` (Web3 blobs - return null)
  - `src/components/ExpandableText.jsx` (Custom scroll height and safety truncation)
  - `src/components/AudioGuide.jsx` (Feature checks for Web Speech API)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Content Expansion | Add 20-30 detailed POIs to src/data.js. Include Ten Scenes of West Lake, New Ten Scenes, Lingyin Temple. | none | DONE |
| 2 | UI Diagnosis & Plan | Analyze the current visual style conflict, locate files/components responsible for Web3 elements, typography contrast, geometry system, shadows/borders, and document a concrete refactoring blueprint in SCOPE.md. | M1 | DONE |
| 3 | Refactoring & Implementation | Apply style changes: remove Web3 background blobs, unify font size/weight contrast, implement a standard border-radius scale, apply subtle shadow/fine border card outline, remove card horizontal dividers, style buttons with glassmorphism, adjust spacing. Ensure dev server runs and build passes. | M2 | DONE |
| 4 | Aesthetic Review & Verification | Verify typography legibility across screens, glassmorphic header aesthetic, card rhythm, border symmetry, build success, and lint compliance. | M3 | DONE |
| 5 | Integrity Forensics & Final Acceptance | Ensure no hardcoded test values, verify compliance with original specifications, perform final clean code checks, and ensure no functional regressions. | M4 | DONE |

## Code Layout
- `src/data.js` - Data source holding 30 detailed POIs.
- `src/App.jsx` - Main app component.
- `src/index.css` - Global styling, typography, colors.
- `src/components/Header.jsx` - Header component including logo text and action buttons.
- `src/components/AmbientBlobs.jsx` - Web3 style background color blobs (disabled).
- `src/components/ExpandableText.jsx` - Expandable component with font-scaling adaptability.
- `src/components/AudioGuide.jsx` - Audio component with safety API checks.
