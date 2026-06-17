import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/xhzha/Documents/my_code/hangzhou-tour-guide';

const filesToCheck = {
  ambientBlobs: path.join(rootDir, 'src/components/AmbientBlobs.jsx'),
  header: path.join(rootDir, 'src/components/Header.jsx'),
  audioGuide: path.join(rootDir, 'src/components/AudioGuide.jsx'),
  app: path.join(rootDir, 'src/App.jsx'),
  indexCss: path.join(rootDir, 'src/index.css')
};

let allPassed = true;

function check(testName, condition, errorMessage) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.log(`[FAIL] ${testName}: ${errorMessage}`);
    allPassed = false;
  }
}

// 1. AmbientBlobs.jsx Check
try {
  const content = fs.readFileSync(filesToCheck.ambientBlobs, 'utf8');
  check(
    'AmbientBlobs: returns null to disable Web3 blobs',
    content.includes('return null;'),
    'AmbientBlobs does not return null to disable Web3 blobs.'
  );
} catch (e) {
  check('AmbientBlobs file exists', false, e.message);
}

// 2. Header.jsx Check
try {
  const content = fs.readFileSync(filesToCheck.header, 'utf8');
  check(
    'Header: Custom header-title class is used',
    content.includes('className="header-title"') || content.includes("className='header-title'"),
    'Header does not contain custom header-title class.'
  );
  check(
    'Header: textScale slider conforms to unified geometry (8px)',
    content.includes("borderRadius: '8px'") || content.includes('borderRadius: "8px"'),
    'Header slider does not use 8px border-radius.'
  );
} catch (e) {
  check('Header file exists', false, e.message);
}

// 3. AudioGuide.jsx Check
try {
  const content = fs.readFileSync(filesToCheck.audioGuide, 'utf8');
  check(
    'AudioGuide: contains hasSpeech feature detection',
    content.includes('hasSpeech =') && content.includes('window.speechSynthesis'),
    'AudioGuide does not perform proper feature detection for Web Speech API.'
  );
} catch (e) {
  check('AudioGuide file exists', false, e.message);
}

// 4. App.jsx Check
try {
  const content = fs.readFileSync(filesToCheck.app, 'utf8');
  // Divider in lists check
  const hasDividerInPoiList = content.includes('className="boundless-divider"') && content.includes('pois.map');
  check(
    'App: no divider in POI lists',
    !hasDividerInPoiList,
    'App still renders a divider in the POI loop.'
  );
  // SpeechSynthesis safety check
  check(
    'App: has speech synthesis cancel safety check',
    content.includes("typeof window !== 'undefined' && window.speechSynthesis") || content.includes("typeof window !== \"undefined\" && window.speechSynthesis"),
    'App does not safely check window.speechSynthesis before cancelling.'
  );
} catch (e) {
  check('App file exists', false, e.message);
}

// 5. index.css Check
try {
  const content = fs.readFileSync(filesToCheck.indexCss, 'utf8');
  // Typography R2 check
  check(
    'index.css: header-title typography custom style',
    content.includes('.header-title') && content.includes('font-family: var(--font-serif-bold)'),
    'index.css does not customize .header-title typography.'
  );
  check(
    'index.css: hero-content h1 has text gradient and drop-shadows',
    content.includes('.hero-content h1') && content.includes('background: linear-gradient') && content.includes('drop-shadow'),
    'index.css does not styled hero h1 with gradient/shadow.'
  );
  
  // Geometry system check
  check(
    'index.css: card border-radius set to 8px',
    content.includes('.poi-card {') && content.includes('border-radius: 8px !important;'),
    'poi-card border-radius is not 8px.'
  );
  check(
    'index.css: button border-radius set to 4px',
    content.includes('.header-btn, .audio-btn {') && content.includes('border-radius: 4px !important;'),
    'header-btn and audio-btn border-radius is not 4px.'
  );
  check(
    'index.css: tip-box border-radius set to 0',
    content.includes('.tip-box {') && content.includes('border-radius: 0 !important;'),
    'tip-box border-radius is not 0.'
  );

  // Borders, shadows, spacing
  check(
    'index.css: cards have fine border and subtle shadow',
    content.includes('.micro-mask-panel') && content.includes('border: 1px solid') && content.includes('box-shadow'),
    'micro-mask-panel does not have refined 1px border and shadow.'
  );
  check(
    'index.css: header buttons have glassmorphic backdrop-filter',
    content.includes('.header-btn') && content.includes('backdrop-filter: blur(8px)'),
    'header-btn does not apply backdrop-filter blur.'
  );
  check(
    'index.css: header wrapper is physically centered without translate interference',
    content.includes('.header-wrapper') && content.includes('left: 0;') && content.includes('right: 0;') && content.includes('margin: 0 auto;'),
    'header-wrapper does not use physics-based alignment to center.'
  );
  check(
    'index.css: fade-mask blends cleanly for dark and light modes',
    content.includes('.fade-mask {') && content.includes('rgba(255, 255, 255, 0.85)') && content.includes('[data-theme=\'dark\'] .fade-mask'),
    'fade-mask colors do not blend cleanly.'
  );
} catch (e) {
  check('index.css file exists', false, e.message);
}

if (allPassed) {
  console.log('\n>>> ALL UI AND FUNCTIONAL VERIFICATIONS PASSED SUCCESSFULLY! <<<');
  process.exit(0);
} else {
  console.log('\n>>> SOME VERIFICATIONS FAILED! <<<');
  process.exit(1);
}
