import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { gsap } from 'gsap';

export const useInstantUrlTransition = (delay) => {
  const router = useRouter();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleTransition = useCallback(async (href, event) => {
    event.preventDefault();

    if (window.location.pathname === href) {
      return;
    }

    if (delay) {
      await sleep(delay);
    }

    window.history.pushState({}, '', href);

    const mainElement = document.querySelector('main');
    const overlayElement = document.querySelector('.transition-overlay');
    const transitionElement = document.querySelector('.transition');

    gsap.to(mainElement, {
      translateY: '-400px',
      ease: 'power4.out',
      duration: 0.7,
    });

    gsap.set(overlayElement, { visibility: 'visible', opacity: 0 });
    gsap.to(overlayElement, {
      opacity: 1,
      ease: 'power4.out',
      duration: 1,
      delay: 0.3,
    });

    gsap.set(transitionElement, { display: 'block' });
    gsap.to(transitionElement, {
      translateY: '0%',
      ease: 'power4.out',
      duration: 1,
      delay: 0.3,
      onComplete: async () => {
        // gsap.set(overlayElement, { visibility: 'hidden', opacity: 0 });
        gsap.set(mainElement, { translateY: '0px' });
        await router.push(href);
        // gsap.set(transitionElement, { display: 'none' });
        // gsap.set(transitionElement, { translateY: '-100%' });
      }
    });
  }, [router]);

  return handleTransition;
};
