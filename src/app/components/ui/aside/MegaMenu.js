"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TextLink from '../textual/TextLink';
import Stack from '../wrapper/Stack';
import MegaMenuItem from './MegaMenuItem';
import styles from './MegaMenu.module.css';


function MegaMenu({ isopen, toggleMenu, isAnimating, setIsAnimating }) {
  const asideRef = useRef(null);
  const overlayRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (isopen === 'open') {
      setMenuVisible(true);

      gsap.fromTo(
        asideRef.current,
        { y: '-100%' },
        {
          delay: 0.6,
          y: '20px',
          duration: 1,
          ease: 'power4.out',
          onComplete: () => setIsAnimating(false),
        }
      );

      gsap.to(overlayRef.current, {
        opacity: 1,
        delay: 0.6,
        duration: 0.6,
        ease: 'power4.out',
        visibility: 'visible',
      });
    } else {
      gsap.to(asideRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power4.in',
        onComplete: () => {
          setMenuVisible(false);
          setIsAnimating(false);
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power4.in',
        onComplete: () => {
          overlayRef.current.style.visibility = 'hidden';
        },
      });
    }
  }, [isopen]);

  return (
    <div style={{ display: menuVisible ? 'block' : 'none' }} className={styles.menu_root}>
      <div
        ref={overlayRef}
        onClick={toggleMenu}
        className={`${styles.aside_overlay} ${isopen === 'open' ? 'visible' : 'hidden'}`}
      />
      <aside ref={asideRef} className={styles.aside_menu}>
        <div className={styles.aside_content}>
          <Stack width={"100%"} spacing={"100px"}>
            <Stack width={"50%"}></Stack>
            <Stack width={"50%"} direction={"column"} spacing={"0px"}>
              <MegaMenuItem href={"/"} transition onClick={toggleMenu}>
                Home
              </MegaMenuItem>
              <MegaMenuItem href={"/about-me"} transition onClick={toggleMenu}>
                About
              </MegaMenuItem>
              <MegaMenuItem href={"/work"} transition onClick={toggleMenu}>
                Work
              </MegaMenuItem>
              <MegaMenuItem href={"/gallery"} transition onClick={toggleMenu}>
                Gallery
              </MegaMenuItem>
            </Stack>
          </Stack>
          <Stack width={"100%"}>
            <Stack width={"33.3%"}>
              <TextLink href={"https://github.com/domov44"} className="step-2">
                github
              </TextLink>
            </Stack>
            <Stack width={"33.3%"} justify={"center"}>
              <TextLink href={"https://www.linkedin.com/in/ronan-scotet-concepteur-web/"} className="step-2">
                linkedin
              </TextLink>
            </Stack>
            <Stack width={"33.3%"} justify={"end"}>
              <TextLink href={"https://www.instagram.com/rscotet/profilecard/?igsh=MWtieXhsNGlkdTl4eA=="} className="step-2">
                instagram
              </TextLink>
            </Stack>
          </Stack>
        </div>
      </aside>
    </div>
  );
}

export default MegaMenu;
