"use client"
import styles from './ProjectsList.module.css';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InvisibleLink from '../../ui/button/InvisibleLink';

function ProjectsList({ worksElements }) {
    const sectionRef = useRef(null);
    const projectRowRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !worksElements?.length) return;

        const section = sectionRef.current;
        const projectRow = projectRowRef.current;

        if (!section || !projectRow) return;

        const animation = gsap.to(projectRow, {
            x: () => -(projectRow.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${projectRow.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                pinSpacing: true
            }
        });

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, [worksElements, isClient]);

    return (
        <section ref={sectionRef} className={styles.Section}>
            {worksElements && worksElements.length > 0 ? (
                <div ref={projectRowRef} className={styles.ProjectRow}>
                    {worksElements.map((work) =>
                        work.videoUrl ? (
                            <article key={work.id} className={styles.ProjectArticle}>
                                <figure>
                                    <video
                                        className={styles.ProjectVideo}
                                        alt={work.name}
                                        src={work.videoUrl}
                                        autoPlay={isClient}
                                        loop
                                        muted
                                        playsInline
                                    />
                                </figure>
                                <InvisibleLink
                                    lineheight="0"
                                    href={`/work/${work.slug}`}
                                    transition
                                >
                                    View work
                                </InvisibleLink>
                            </article>
                        ) : null
                    )}
                </div>
            ) : (
                <p>No worksElements found</p>
            )}
        </section>
    );
}

export default ProjectsList;