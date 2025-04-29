import { useRef, useEffect } from 'react';
import styles from './Resize.module.css';

export default function Resizer({ onResize }) {
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const containerHeight = window.innerHeight;
      const newHeightPercent = (e.clientY / containerHeight) * 100;
      if (newHeightPercent > 10 && newHeightPercent < 90) {
        onResize(newHeightPercent);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onResize]);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  return (
    <div
      className={styles.resizer}
      onMouseDown={handleMouseDown}
    />
  );
}
