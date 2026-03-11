import React, { useEffect, useRef, useState } from 'react';
import styles from './RotatingWord.module.css';

const WORDS = [
  'free and open map data.',
  'modular, extensible schemas.',
  'stable IDs for the world.',
  'shared infrastructure.',
  'global, cross-sector collaboration.',
  'an invitation to build together.',
];

const EASTER_EGG = 'Jennings Anderson.';
const LOOPS_BEFORE_EGG = 100;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  const pausedRef = useRef(false);
  const loopCountRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setIndex(prev => {
          const next = (prev + 1) % WORDS.length;
          if (next === 0) {
            loopCountRef.current += 1;
            if (loopCountRef.current === LOOPS_BEFORE_EGG) {
              setShowEgg(true);
              return prev;
            }
          }
          return next;
        });
      }
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // After showing the easter egg, resume normal rotation
  useEffect(() => {
    if (!showEgg) return;
    const timeout = setTimeout(() => {
      setShowEgg(false);
      setIndex(0);
    }, 3200);
    return () => clearTimeout(timeout);
  }, [showEgg]);

  const displayWords = showEgg ? [EASTER_EGG] : WORDS;
  const activeIndex = showEgg ? 0 : index;

  return (
    <>
      <div
        className={styles.rotatingWrap}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {displayWords.map((word, i) => (
          <span
            key={word}
            className={`${styles.rotatingWord} ${i === activeIndex ? styles.active : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
      <div className={styles.rotateDots}>
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`${styles.rotateDot} ${!showEgg && i === index ? styles.activeDot : ''}`}
            onClick={() => { setShowEgg(false); setIndex(i); }}
          />
        ))}
      </div>
    </>
  );
}