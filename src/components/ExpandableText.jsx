import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const ExpandableText = ({ title, text, icon: Icon, isDropCap = false }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
  const shouldTruncate = text.length > 150 || paragraphs.length > 1;

  return (
    <div className="article-section">
      {title && (
        <h4>
          {Icon && <Icon size={18} />}
          {title}
        </h4>
      )}
      <div className={`expandable-container ${isDropCap ? 'drop-cap' : ''}`}>
        <motion.div 
          initial={false}
          animate={{ height: (expanded || !shouldTruncate) ? 'auto' : 'calc(12.5rem * var(--text-scale))' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ overflow: 'hidden', position: 'relative' }}
        >
          {paragraphs.map((p, idx) => (
            <p key={idx} className="article-paragraph">{p}</p>
          ))}
          <AnimatePresence>
            {!expanded && shouldTruncate && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fade-mask" 
              />
            )}
          </AnimatePresence>
        </motion.div>
        {shouldTruncate && (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="expand-btn" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>收起内容 <ChevronUp size={16} /></>
            ) : (
              <>展开阅读 <ChevronDown size={16} /></>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

