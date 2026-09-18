import React, { useEffect, useState, useRef } from 'react';

export default function StatCounter({ endValue, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const startVal = 0;
    const target = parseInt(endValue, 10);

    if (isNaN(target)) {
      setCount(endValue);
      return;
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + (target - startVal) * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, endValue, duration]);

  return (
    <span ref={elementRef} className="tabular-nums font-bold text-gold-gradient">
      {count}
      {suffix}
    </span>
  );
}
