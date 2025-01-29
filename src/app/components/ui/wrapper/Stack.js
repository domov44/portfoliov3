'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { useGsapAnimation } from '../../animation/AnimationGsap';
import styles from './Stack.module.css';

const Stack = forwardRef(({
  className, 
  direction, 
  align, 
  opacity, 
  margin, 
  overflow, 
  justify, 
  zIndex, 
  height, 
  children, 
  width, 
  spacing, 
  position, 
  right, 
  left, 
  top, 
  bottom, 
  padding, 
  radius, 
  animate, 
  animationType, 
  separator, 
  flexWrap,
}, ref) => {
  const internalRef = useRef();
  useGsapAnimation();

  useEffect(() => {
    const animate = async () => {
      while (!window.gsapAnimations) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (animationType && internalRef.current) {
        const animateFunction = window.gsapAnimations[animationType];
        if (animateFunction) {
          animateFunction(internalRef.current);
        }
      }
    };

    animate();
  }, [animationType]);

  const getPosition = () => {
    if (position === "fixed") return "fixed";
    if (position === "absolute") return "absolute";
    if (position === "sticky") return "sticky";
    if (position === "relative") return "relative";
    return "";
  };

  return (
    <div
      className={`
        ${styles.stack} 
        ${separator ? styles.separator : ''}
        ${className || ''}`
      }
      style={{
        position: getPosition(),
        right: right || "",
        overflowY: overflow || "",
        left: left || "",
        zIndex: zIndex || "",
        top: top || "",
        margin: margin || "",
        bottom: bottom || "",
        gap: spacing || "10px",
        width: width || "fit-content",
        height: height || "",
        padding: padding || "",
        flexWrap: flexWrap || "",
        borderRadius: radius || "",
        flexDirection: direction === "column" ? "column" : "row",
        alignItems: align === "center" ? "center" : "",
        justifyContent: justify || "start",
        opacity: opacity || ""
      }}
      ref={ref || internalRef}
    >
      {children}
    </div>
  );
});

export default Stack;