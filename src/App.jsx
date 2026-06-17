import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Star, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { data } from './data';
import { Header } from './components/Header';
import { ExpandableText } from './components/ExpandableText';
import { AudioGuide } from './components/AudioGuide';
import { AmbientBlobs } from './components/AmbientBlobs';
import './index.css';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { 
    opacity: 0, 
    x: -20, 
    transition: { duration: 0.15, ease: 'easeOut' } // 退场必须干脆，否则 mode="wait" 会导致黑屏过长
  }
};

const pageTransition = { 
  type: 'spring', 
  stiffness: 300, 
  damping: 25 
};

const staggerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const HomeView = ({ theme, toggleTheme, navigateTo, scrollPositions, textScale, setTextScale }) => {
  useEffect(() => {
    window.scrollTo(0, scrollPositions.current['home'] || 0);
  }, [scrollPositions]);

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <Header theme={theme} toggleTheme={toggleTheme} textScale={textScale} setTextScale={setTextScale} />
      <div className="hero">
        <img src="/images/west_lake_su_causeway_1781707034135.png" alt="Hangzhou" />
        <div className="hero-content">
          <h1>杭州</h1>
          <p>天堂之城 · 导游手卡</p>
        </div>
      </div>
      <div className="sections-nav">
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="section-card micro-mask-panel" 
          onClick={() => navigateTo('list', 'westlake')}
        >
          <h2>西湖</h2>
          <p>人间天堂 浓妆淡抹总相宜</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="section-card micro-mask-panel" 
          onClick={() => navigateTo('list', 'lingyin')}
        >
          <h2>灵隐寺</h2>
          <p>云林禅寺 仙灵所隐之圣地</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ListView = ({ view, theme, toggleTheme, navigateTo, scrollPositions, textScale, setTextScale }) => {
  const sectionData = data[view.section];

  useEffect(() => {
    window.scrollTo(0, scrollPositions.current['list'] || 0);
  }, [scrollPositions]);

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <Header showBack onBack={() => navigateTo('home')} theme={theme} toggleTheme={toggleTheme} textScale={textScale} setTextScale={setTextScale} />
      <div className="list-header">
        <h2>{sectionData.title}</h2>
        <p>{sectionData.description}</p>
      </div>
      <div className="poi-list">
        {sectionData.pois.map(poi => (
          <React.Fragment key={poi.id}>
            <motion.div 
              whileHover={{ scale: 1.02, x: 10 }} 
              whileTap={{ scale: 0.98 }} 
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="poi-card micro-mask-panel" 
              onClick={() => navigateTo('detail', view.section, poi)}
            >
              <img src={poi.image} alt={poi.name} />
              <div className="poi-card-info">
                <h3>{poi.name}</h3>
                <p>{poi.history}</p>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

const DetailView = ({ view, theme, toggleTheme, navigateTo, textScale, setTextScale }) => {
  const poi = view.poi;
  const sectionData = data[view.section];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [poi.id]);

  const currentIndex = sectionData.pois.findIndex(p => p.id === poi.id);
  const hasNext = currentIndex < sectionData.pois.length - 1;
  const hasPrev = currentIndex > 0;

  const goNext = () => navigateTo('detail', view.section, sectionData.pois[currentIndex + 1]);
  const goPrev = () => navigateTo('detail', view.section, sectionData.pois[currentIndex - 1]);

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="detail-view">
      <Header showBack onBack={() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        navigateTo('list', view.section);
      }} theme={theme} toggleTheme={toggleTheme} textScale={textScale} setTextScale={setTextScale} />
      
      <div className="detail-image-container">
        <img src={poi.image} alt={poi.name} className="detail-image" />
        <div className="detail-image-mask" />
      </div>

      <div className="detail-content">
        <motion.div variants={staggerVariants} initial="hidden" animate="visible" className="detail-title-wrapper">
          <h2>{poi.name}</h2>
          <AudioGuide title={poi.name} text={poi.history} />
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="detail-panel"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <motion.div variants={staggerVariants}><ExpandableText title="历史渊源" text={poi.history} icon={BookOpen} isDropCap={true} /></motion.div>
          <motion.div variants={staggerVariants}><ExpandableText title="传说典故" text={poi.legend} icon={Sparkles} /></motion.div>
          <motion.div variants={staggerVariants}><ExpandableText title="景观特色" text={poi.features} icon={Star} /></motion.div>
          
          {poi.tip && (
            <motion.div variants={staggerVariants} className="tip-box" style={{ background: 'transparent', borderLeft: 'none', borderTop: '2px solid var(--accent-color)', borderRadius: 0, padding: '1.5rem 0 0 0' }}>
              <h4 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={18} /> 游玩贴士
              </h4>
              {poi.tip.split('\n\n').filter(p => p.trim() !== '').map((p, idx) => (
                <p key={idx} className="article-paragraph">{p}</p>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="fab-container">
        {hasPrev && (
          <motion.button className="fab-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} onClick={() => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.cancel();
            }
            goPrev();
          }}>
            <ArrowLeft size={18} /> 上一景
          </motion.button>
        )}
        {hasNext && (
          <motion.button className="fab-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} onClick={() => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.cancel();
            }
            goNext();
          }}>
            下一景 <ArrowRight size={18} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [textScale, setTextScale] = useState(1);
  const [view, setView] = useState({ type: 'home', section: null, poi: null });
  const scrollPositions = useRef({ home: 0, list: 0 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigateTo = (type, section = null, poi = null) => {
    scrollPositions.current[view.type] = window.scrollY;
    
    if (type === 'list' && view.type === 'home') {
      scrollPositions.current['list'] = 0;
    }
    
    setView({ type, section, poi });
  };

  return (
    <div className={`app-container ${textScale < 1.0 ? 'low-scale' : ''}`} style={{ '--text-scale': textScale }}>
      <AmbientBlobs theme={theme} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {view.type === 'home' && <HomeView key="home" theme={theme} toggleTheme={toggleTheme} navigateTo={navigateTo} scrollPositions={scrollPositions} textScale={textScale} setTextScale={setTextScale} />}
          {view.type === 'list' && <ListView key="list" view={view} theme={theme} toggleTheme={toggleTheme} navigateTo={navigateTo} scrollPositions={scrollPositions} textScale={textScale} setTextScale={setTextScale} />}
          {view.type === 'detail' && <DetailView key={`detail-${view.poi?.id}`} view={view} theme={theme} toggleTheme={toggleTheme} navigateTo={navigateTo} scrollPositions={scrollPositions} textScale={textScale} setTextScale={setTextScale} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
