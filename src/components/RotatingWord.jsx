import React, { useEffect, useRef, useState } from 'react';
import styles from './RotatingWord.module.css';

const WORDS = [
  'free and open map data.',
  'modular, extensible schemas.',
  'stable UUIDs for the world.',
  'shared infrastructure.',
  'cross-sector collaboration.',
  'an invitation to build together.',
];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setIndex(i => (i + 1) % WORDS.length);
      }
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={styles.rotatingWrap}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={`${styles.rotatingWord} ${i === index ? styles.active : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
      <div className={styles.rotateDots}>
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`${styles.rotateDot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
}
