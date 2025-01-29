'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Container from '../wrapper/Container';
import DynamicHour from '../../../utils/DynamicHour';
import Stack from '../wrapper/Stack';
import Logo from '../Logo';
import InvisibleLink from '../button/InvisibleLink';
import styles from './Header.module.css';

function Header({ isopen, toggleMenu, isAnimating }) {
    const buttonRef = useRef(null);
    const menuTextRef = useRef(null);
    const closeTextRef = useRef(null);
    const timelineRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const menuSpan = menuTextRef.current;
        const closeSpan = closeTextRef.current;

        gsap.set([menuSpan, closeSpan], { 
            visibility: 'hidden',
            yPercent: 200
        });

        gsap.set(menuSpan, { 
            yPercent: isopen === 'open' ? -200 : 0,
            visibility: 'visible'
        });
        gsap.set(closeSpan, { 
            yPercent: isopen === 'open' ? 0 : 200,
            visibility: 'visible'
        });

        timelineRef.current = gsap.timeline({ paused: true })
            .to(menuSpan, {
                duration: 0.8,
                yPercent: -100,
                ease: 'power2.inOut',
            })
            .to(closeSpan, {
                duration: 0.8,
                yPercent: 0,
                ease: 'power2.inOut',
            }, 0);

        if (isopen === 'open') {
            timelineRef.current.progress(1);
        }

        setIsReady(true);

        return () => {
            timelineRef.current.kill();
        };
    }, []);

    useEffect(() => {
        if (!isReady) return;

        if (isopen === 'open') {
            timelineRef.current.play();
        } else {
            timelineRef.current.reverse();
        }
    }, [isopen, isReady]);

    const handleClick = () => {
        if (isAnimating || !isReady) return;
        toggleMenu();
    };

    return (
        <header className={styles.header}>
            <Container direction="row" align="center" width="full" justify="space-between">
                <Stack align="center" width="33%">
                    <InvisibleLink href={"/"} lineheight={"0"} transition>
                        <Logo />
                    </InvisibleLink>
                </Stack>
                <Stack align="center" width="33%" justify="center">
                    <button
                        ref={buttonRef}
                        onClick={handleClick}
                        className={`${styles.asideButton} ${!isReady ? styles.buttonHidden : ''}`}
                        disabled={!isAnimating && !isReady}
                    >
                        <div className={styles.buttonTextWrapper}>
                            <span ref={menuTextRef} className={styles.buttonText}>
                                menu
                            </span>
                            <span ref={closeTextRef} className={styles.buttonText}>
                                close
                            </span>
                        </div>
                    </button>
                </Stack>
                <Stack align="center" width="33%" justify="end">
                    <DynamicHour />
                </Stack>
            </Container>
        </header>
    );
}

export default Header;