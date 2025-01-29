import { useEffect } from 'react';

export const useGsapAnimation = () => {
    useEffect(() => {
        (async () => {
            const gsap = (await import('gsap')).default;
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);

            const textWaveAnimation = (element, duration = 1) => {
                const text = element.textContent;
                const chars = text.split('');

                element.textContent = '';

                gsap.set(element, { opacity: 1, display: 'inline-block' });

                chars.forEach((char, index) => {
                    const wrapper = document.createElement('span');
                    const delay = index * 0.05;
                    wrapper.textContent = char;
                    gsap.from(wrapper, {
                        y: '100%',
                        opacity: 0,
                        duration,
                        ease: 'bounce.out',
                        delay,
                    });
                    gsap.to(wrapper, {
                        y: '-100%',
                        duration,
                        ease: 'power3.in',
                        delay: duration + delay,
                    });
                    element.appendChild(wrapper);
                });
            };

            const animateMoveFromLeft = (element) => {
                gsap.fromTo(element, {
                    x: '-100%',
                }, {
                    duration: .5,
                    x: '0%',
                    ease: "elastic.out(0.15)",
                });
            }

            const animateMoveFromRight = (element) => {
                gsap.fromTo(element, {
                    x: '200%',
                }, {
                    duration: .5,
                    x: '0%',
                    ease: "elastic.out(0.15)",
                });
            }

            const animateMoveToLeft = (element) => {
                gsap.to(element, {
                    duration: .2,
                    x: '-100%',
                });
            }

            const animateMoveFromLeftResponsive = (element) => {
                gsap.fromTo(element, {
                    x: '-100%',
                }, {
                    duration: .1,
                    x: '0%',
                    ease: "elastic.out(0.15)",
                });
            }

            const animateMoveToLeftResponsive = (element) => {
                gsap.to(element, {
                    duration: .1,
                    x: '-100%',
                });
            }

            const animateFadeInBounce = (element) => {
                gsap.fromTo(element, {
                    scale: .7,
                    opacity: .5,
                }, {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 100%', 
                        end: '+=100',
                        toggleActions: 'play none none none', 
                    },
                    duration: 1,
                    scale: 1,
                    opacity: 1,
                    ease: "bounce.out",
                })
            }

            const animateFadeIn = (element) => {
                gsap.fromTo(element, {
                    opacity: 0,
                }, {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 100%', 
                        end: '+=100',
                        toggleActions: 'play none none none', 
                    },
                    duration: 1,
                    delay: 0.4,
                    opacity: 1,
                    ease: "fade.in"
                })
            }

            const animateMoveFromDown = (element) => {
                gsap.fromTo(element, {
                    y: window.innerHeight,
                }, {
                    duration: 1,
                    y: 0,
                    ease: "bounce.out",
                });
            }

            const animateScale = (element) => {
                gsap.to(element, {
                    duration: 2,
                    scale: 1,
                    ease: "elastic.out(1, 0.3)",
                });
            }

            const animateRotate = (element) => {
                gsap.to(element, {
                    duration: 1,
                    rotation: 360,
                    ease: "power1.out",
                });
            }

            const animateColorChange = (element) => {
                gsap.to(element, {
                    duration: 2,
                    backgroundColor: '#ff0000',
                    ease: "power1.out",
                });
            }

            const animateOpacity = (element) => {
                gsap.to(element, {
                    duration: 2,
                    opacity: 0,
                    ease: "power1.out",
                });
            }

            // Exportation des fonctions ici
            window.gsapAnimations = {
                textWaveAnimation,
                animateMoveFromLeft,
                animateMoveFromRight,
                animateMoveToLeft,
                animateMoveFromLeftResponsive,
                animateMoveToLeftResponsive,
                animateFadeInBounce,
                animateFadeIn,
                animateMoveFromDown,
                animateScale,
                animateRotate,
                animateColorChange,
                animateOpacity,
            };
        })();
    }, []);
};
