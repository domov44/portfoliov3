'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Title from '../../ui/textual/Title';
import Hero from '../../ui/wrapper/Hero';
import { gsap } from 'gsap';
import Stack from '../../ui/wrapper/Stack';
import TextLink from '../../ui/textual/TextLink';
import Image from 'next/image';
import styles from './HomeHero.module.css';


const ImageList = styled.ul`
    z-index: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const ImageItem = styled.li`
    position: absolute;
    opacity: 0;
    width: 16vw;
    transition: width 0.3s ease, height 0.3s ease;
`;

const ImagesList = ({ images }) => {
    return (
        <ImageList>
            {images.map((image, index) => (
                <ImageItem
                    key={index}
                    className={`image-container-${index} hidden`}
                >
                    <Image
                        className={styles.thumnailImage}
                        src={image.sourceUrl}
                        alt={image.alt}
                        width={250}
                        height={250}
                    />
                </ImageItem>
            ))}
        </ImageList>
    );
};

const HomeHero = ({ images, centerText, rightUrl, heading, leftUrl }) => {
    const [visibleImages, setVisibleImages] = useState([]);
    const heroRef = useRef(null);
    const lastImagePosition = useRef({ x: 0, y: 0, time: performance.now() });
    const zIndexCounter = useRef(1);
    const titleRef = useRef(null);

    const titleText = heading;

    const animateTitle = useCallback(() => {
        const letters = titleRef.current.children;
        titleRef.current.classList.remove('hidden');

        gsap.fromTo(
            letters,
            { y: 250, scale: 0.8 },
            {
                y: 0,
                scale: 1,
                stagger: 0.03,
                duration: 0.4,
                ease: "power2.out",
            }
        );
    }, []);

    useEffect(() => {
        animateTitle();
    }, [animateTitle]);

    const handleMouseMove = useCallback((e) => {
        if (!heroRef.current) return;

        const { clientX: x, clientY: y } = e;
        const { left, top } = heroRef.current.getBoundingClientRect();

        const adjustedX = x - left;
        const adjustedY = y - top;

        if (adjustedX >= 0 && adjustedX <= heroRef.current.clientWidth &&
            adjustedY >= 0 && adjustedY <= heroRef.current.clientHeight) {
            const timeNow = performance.now();
            const timeDelta = timeNow - lastImagePosition.current.time;

            const deltaX = adjustedX - lastImagePosition.current.x;
            const deltaY = adjustedY - lastImagePosition.current.y;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            const distanceVW = (distance / window.innerWidth) * 100;

            const velocity = distance / timeDelta || 1;

            if (distanceVW >= 7) {
                const availableIndices = images.map((_, index) => index)
                    .filter(index => !visibleImages.includes(index));

                if (availableIndices.length === 0 && visibleImages.length > 0) {
                    const oldestImageIndex = visibleImages[0];
                    const oldestElement = heroRef.current.querySelector(`.image-container-${oldestImageIndex}`);

                    if (oldestElement) {
                        gsap.killTweensOf(oldestElement);
                        oldestElement.style.opacity = 0;
                        setVisibleImages(prev => prev.filter(img => img !== oldestImageIndex));
                        availableIndices.push(oldestImageIndex);
                    }
                }

                if (availableIndices.length > 0) {
                    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                    const randomImageClass = `.image-container-${randomIndex}`;
                    const liElement = heroRef.current.querySelector(randomImageClass);
                    liElement.classList.remove('hidden');

                    if (liElement) {
                        const imageWidth = liElement.offsetWidth;
                        const imageHeight = liElement.offsetHeight;
                        const offsetX = imageWidth / 2;
                        const offsetY = imageHeight / 2;

                        liElement.style.left = `${adjustedX - offsetX}px`;
                        liElement.style.top = `${adjustedY - offsetY}px`;
                        liElement.style.opacity = 1;
                        liElement.style.zIndex = zIndexCounter.current++;

                        const viewportWidth = window.innerWidth;
                        const translateDistance = Math.min(viewportWidth * 0.4, Math.max(200, velocity ** 2 * 10));
                        const translateX = -deltaX / distance * translateDistance;
                        const translateY = -deltaY / distance * translateDistance;

                        gsap.fromTo(liElement,
                            {
                                clipPath: 'circle(0% at 50% 50%)',
                                x: translateX,
                                y: translateY
                            },
                            {
                                clipPath: 'circle(75% at 50% 50%)',
                                x: 0,
                                y: 0,
                                duration: 1,
                                ease: 'power2.out',
                                onComplete: () => {
                                    gsap.to(liElement, {
                                        opacity: 0,
                                        duration: 0.5,
                                        onComplete: () => {
                                            setVisibleImages(prev => prev.filter(img => img !== randomIndex));
                                        }
                                    });
                                }
                            }
                        );

                        lastImagePosition.current = { x: adjustedX, y: adjustedY, time: timeNow };
                        setVisibleImages(prev => [...prev, randomIndex]);
                    }
                }
            }
        }
    }, [visibleImages, images]);

    useEffect(() => {
        const currentHero = heroRef.current;
        if (!currentHero) return;

        currentHero.addEventListener('mousemove', handleMouseMove);

        return () => {
            currentHero.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <Hero ref={heroRef}>
            <ImagesList images={images} />
            <Stack direction={"column"} width={"100%"} height={"calc(70vh - 80px)"} justify={"space-between"}>
                <Stack justify={"space-between"} width={"100%"} zIndex={2} animationType={"animateFadeIn"} opacity={"0"}>
                    <Stack width={"33.3%"}>
                        <TextLink href={"https://github.com/domov44"}>{leftUrl.title}</TextLink>
                    </Stack>
                    <Stack width={"33.3%"} justify={"center"}>
                        <Title level={6} className="text_align_center default">{centerText}</Title>
                    </Stack>
                    <Stack width={"33.3%"} justify={"end"}>
                        <TextLink href={"https://www.linkedin.com/in/ronan-scotet-concepteur-web/"}>{rightUrl.title}</TextLink>
                    </Stack>
                </Stack>
                <Stack overflow={"hidden"} justify={"end"} width={"100%"}>
                    <Title ref={titleRef} level={1} data_cy="name-surname" className="colored hidden font14vw zIndex_-1">
                        {titleText.split('').map((letter, index) => (
                            <span
                                key={index}
                                style={{
                                    display: 'inline-block',
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        ))}
                    </Title>
                </Stack>
            </Stack>
        </Hero>
    );
}

export default HomeHero;