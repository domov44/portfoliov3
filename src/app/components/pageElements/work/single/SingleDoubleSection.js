"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../../../ui/wrapper/Section';
import styles from './SingleDoubleSection.module.css';

function SingleDoubleSection({ left_image, right_image }) {
    const sectionRef = useRef(null);
    const imageRefs = useRef([]);

    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        if (sectionRef.current) {
            imageRefs.current.forEach((image, index) => {
                if (image) {
                    gsap.to(image, {
                        y: '10%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                }
            });
        }
    }, []);

    return (
        <Section className="h80vh defaultPadding align_center" ref={sectionRef}>
            <div className={styles.wrapper_single}>
                <div className={styles.stack_single}>
                    <figure className={styles.image_section}>
                        <img
                            className={styles.image_bg}
                            ref={(el) => (imageRefs.current)}
                            src={left_image.sourceUrl}
                            alt={left_image.altText}
                        />
                    </figure>
                </div>
                <div className={styles.stack_single}>
                    <figure className={styles.image_section}>
                        <img
                            className={styles.image}
                            ref={(el) => (imageRefs.current)}
                            src={right_image.sourceUrl}
                            alt={right_image.altText}
                        />
                    </figure>
                </div>
            </div>
        </Section>
    );
}

export default SingleDoubleSection;