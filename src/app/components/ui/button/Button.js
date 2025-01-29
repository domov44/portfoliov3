'use client';
import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useInstantUrlTransition } from '../../../utils/useInstantUrlTransition';
import styles from './Button.module.css';

const Button = ({ children, onClick, className, width, href, transition = false, target, variant = 'primary' }) => {
  const buttonRef = useRef(null);
  const handleTransition = useInstantUrlTransition();
  const [circle, setCircle] = useState({ x: 0, y: 0, size: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCircle({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size: Math.max(rect.width, rect.height) * 1.5
    });
  }, []);

  const handleMouseEnter = useCallback((e) => {
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setCircle(prev => ({ ...prev, size: 0 }));
  }, []);

  const Component = href ? Link : 'button';

  return (
    <Component
      href={href}
      {...(href && { target })}
      className={`${styles.button} ${styles[variant]} ${width === "fit-content" ? styles.fitContent : width === "full-width" ? styles.fullWidth : ""} ${className}`}
      onMouseDown={transition ? (event) => event.preventDefault() : undefined}
      onClick={href && transition ? (event) => handleTransition(href, event) : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={buttonRef}
    >
      <div
        className={styles.circle}
        style={{
          left: circle.x,
          top: circle.y,
          width: circle.size,
          height: circle.size
        }}
      />
      <span>{children}</span>
    </Component>
  );
};

export default Button;
