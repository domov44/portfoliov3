"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SingleMainSection.module.css';


function SingleMainSection({ image }) {
    const sectionRef = useRef(null);
    const imageBgRef = useRef(null);

    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        if (sectionRef.current && imageBgRef.current) {
            gsap.to(imageBgRef.current, {
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
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <figure className={styles.image_section}>
                <img
                    className={styles.image_bg}
                    ref={imageBgRef}
                    src={image.sourceUrl}
                    alt={image.altText}
                />
            </figure>
        </section>
    );
}

export default SingleMainSection;