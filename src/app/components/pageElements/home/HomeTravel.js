'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Title from '../../ui/textual/Title';
import Stack from '../../ui/wrapper/Stack';
import Section from '../../ui/wrapper/Section';
import TextLink from '../../ui/textual/TextLink';
import styles from './HomeTravel.module.css';

const HomeTravel = ({ gallery, background, link, heading, text }) => {
    const imageRefs = useRef([]);
    const sectionRef = useRef(null);
    const imageBgRef = useRef(null);

    const galleryImages = gallery?.flatMap(gal => gal.images.map(img => img.sourceUrl)) || [];

    useEffect(() => {
        const loadGSAP = async () => {
            if (typeof window !== 'undefined') {
                const gsap = (await import('gsap')).default;
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                
                gsap.registerPlugin(ScrollTrigger);

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
                            const totalItems = galleryImages.length;
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
            }
        };

        loadGSAP();
    }, [galleryImages]);

    return (
        <>
            <Section>
                <Stack width="100%" justify="center">
                    <Title level={2} className="colored font8vw text_align_center w70vw ln0_8">
                        {heading}
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
                                {galleryImages.map((src, index) => (
                                    <li
                                        className={styles.image_item}
                                        key={index}
                                        ref={el => imageRefs.current[index] = el}
                                        style={{ opacity: index === 0 ? 1 : 0 }}
                                    >
                                        <picture className={styles.picture}>
                                            <Image width={800} height={800} className={styles.image} src={src} alt={`Gallery ${index + 1}`} />
                                        </picture>
                                    </li>
                                ))}
                            </ul>
                        </Stack>
                        <Stack width="33.3%" justify="end">
                            <TextLink href={link.url || '#'}>{link.title}</TextLink>
                        </Stack>
                    </Stack>
                    <figure className={styles.image_section}>
                        <Image width={3000} height={3000} className={styles.image_bg} ref={imageBgRef} src={background[0]?.sourceUrl || ''} alt="Background" />
                    </figure>
                </Stack>
            </Section>
        </>
    );
};

export default HomeTravel;