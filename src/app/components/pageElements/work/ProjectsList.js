"use client";
import styles from './ProjectsList.module.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InvisibleLink from '../../ui/button/InvisibleLink';

function ProjectsList({ worksElements }) {
    const sectionRef = useRef(null);
    const projectRowRef = useRef(null);
    const projectRefs = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const section = sectionRef.current;
            const projectRow = projectRowRef.current;

            if (!section || !projectRow) return;

            const articles = projectRefs.current;

            articles.forEach((article, index) => {
                if (index < 3) {
                    article.style.opacity = 1;
                    gsap.fromTo(article,
                        { x: 800 },
                        {
                            x: 0,
                            duration: 2,
                            ease: "power4.out",
                            delay: index * 0.05
                        }
                    );
                }
            });

            const scrollAnimation = gsap.to(projectRow, {
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
                scrollAnimation.scrollTrigger?.kill();
                scrollAnimation.kill();
            };
        });

        mm.add("(max-width: 767px)", () => {
            const articles = projectRefs.current;
            const projectRow = projectRowRef.current;

            if (projectRow) {
                gsap.killTweensOf(projectRow);
                gsap.set(projectRow, { clearProps: "all" });
            }

            if (articles) {
                gsap.killTweensOf(articles);
                gsap.set(articles, { clearProps: "all" });
            }

            return () => {
                if (projectRow) {
                    gsap.killTweensOf(projectRow);
                    gsap.set(projectRow, { clearProps: "all" });
                }

                if (articles) {
                    gsap.killTweensOf(articles);
                    gsap.set(articles, { clearProps: "all" });
                }
            };
        });

        return () => {
            mm.revert();
        };
    }, [worksElements]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const videoUrl = video.getAttribute('data-src');
                    video.src = videoUrl;
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: '200px',
        });

        projectRefs.current.forEach((article) => {
            const video = article.querySelector('video');
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [worksElements]);

    return (
        <section ref={sectionRef} className={styles.Section}>
            {worksElements && worksElements.length > 0 ? (
                <div ref={projectRowRef} className={styles.ProjectRow}>
                    {worksElements.map((work, index) => (
                        work.videoUrl ? (
                            <article
                                key={work.id}
                                ref={(el) => (projectRefs.current[index] = el)}
                                className={styles.ProjectArticle}
                            >
                                <figure>
                                    <video
                                        className={styles.ProjectVideo}
                                        alt={work.name}
                                        data-src={work.videoUrl}
                                        autoPlay
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
                    ))}
                </div>
            ) : (
                <p>No worksElements found</p>
            )}
        </section>
    );
}

export default ProjectsList;
