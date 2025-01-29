'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '../../ui/textual/Title';
import Stack from '../../ui/wrapper/Stack';
import Section from '../../ui/wrapper/Section';
import TextLink from '../../ui/textual/TextLink';
import styles from './HomeTravel.module.css';

gsap.registerPlugin(ScrollTrigger);

const HomeTravel = ({ images, background }) => {
    const imageRefs = useRef([]);
    const sectionRef = useRef(null);
    const imageBgRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current && imageBgRef.current) {
            const sectionHeight = sectionRef.current.offsetHeight;
            const computedStyle = window.getComputedStyle(sectionRef.current);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            const heightWithoutPadding = sectionHeight - paddingTop - paddingBottom;

            gsap.to(imageBgRef.current, {
                y: '10%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `bottom top`,
                    scrub: true,
                },
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `${heightWithoutPadding} bottom`,
                onUpdate: (self) => {
                    const progress = self.progress || 0;
                    const totalItems = images.length;
                    const indexToHide = Math.floor(progress * (totalItems - 1));

                    imageRefs.current.forEach((image, index) => {
                        if (index <= indexToHide) {
                            gsap.set(image, { opacity: 1 });
                        } else {
                            gsap.set(image, { opacity: 0 });
                        }
                    });
                },
                scrub: true,
            });
        }
    }, [images]);

    return (
        <>
            <Section>
                <Stack width="100%" justify="center">
                    <Title level={2} className="colored font8vw text_align_center w70vw ln0_8">
                        BEYOND CODE. CAPTURING MOMENTS
                    </Title>
                </Stack>
            </Section>
            <Section overflow padding="0px" fullWidth>
                <Stack ref={sectionRef} className="scroll-section" position="relative" direction="column" overflow height="260vh" justify="start" padding="0px 0px 70vh 0px" spacing="100px" width="100%">
                    <Stack zIndex={2} justify="space-between" align="center" width="100%" position="sticky" top="30vh" padding="0px 30px">
                        <Stack width="33.3%">
                            <Title level={5} className="default step-1">TRAVEL</Title>
                        </Stack>
                        <Stack width="33.3%" justify="center">
                            <ul className={styles.image_list}>
                                {images.map((src, index) => (
                                    <li
                                        className={styles.image_item}
                                        key={index}
                                        ref={el => imageRefs.current[index] = el}
                                        style={{ opacity: index === 0 ? 1 : 0 }}
                                    >
                                        <picture className={styles.picture}>
                                            <img className={styles.image} src={src} alt={`Gallery`} />
                                        </picture>
                                    </li>
                                ))}
                            </ul>
                        </Stack>
                        <Stack width="33.3%" justify="end">
                            <TextLink href="https://www.linkedin.com/in/ronan-scotet-concepteur-web/">@ronanscotet</TextLink>
                        </Stack>
                    </Stack>
                    <figure className={styles.image_section}>
                        <img className={styles.image_bg} ref={imageBgRef} src={background} alt="Background" />
                    </figure>
                </Stack>
            </Section>
        </>
    );
};

export default HomeTravel;
