import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';

export const Header = ({ showBack, onBack, theme, toggleTheme, title = '杭州导游', textScale, setTextScale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`header-wrapper ${scrolled ? 'header-scrolled' : ''}`}
    >
      {showBack ? (
        <motion.button 
          whileHover={{ opacity: 0.8 }} 
          whileTap={{ scale: 0.95 }} 
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="header-btn" 
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </motion.button>
      ) : (
        <motion.div 
          className="header-title"
        >
          {title}
        </motion.div>
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {setTextScale && (
          <div style={{ position: 'relative' }}>
            <motion.button 
              whileHover={{ opacity: 0.8 }} 
              whileTap={{ scale: 0.95 }} 
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="header-btn" 
              onClick={() => setShowSlider(!showSlider)} 
              aria-label="调整字号"
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'var(--font-serif-bold)' }}>A</span>
            </motion.button>
            <AnimatePresence>
              {showSlider && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="micro-mask-panel"
                  style={{
                    position: 'absolute',
                    top: '120%', right: 0,
                    padding: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    zIndex: 1000,
                    width: '220px',
                    borderRadius: '8px'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>小</span>
                  <input 
                    type="range" min="0.8" max="1.5" step="0.1" 
                    value={textScale} 
                    onChange={(e) => setTextScale(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--accent-color)' }}
                  />
                  <span style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif-bold)' }}>大</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <motion.button 
          whileHover={{ opacity: 0.8 }} 
          whileTap={{ scale: 0.95 }} 
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="header-btn" 
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
      </div>
    </motion.div>
  );
};

