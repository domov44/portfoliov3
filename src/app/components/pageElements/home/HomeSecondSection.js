"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Stack from '../../ui/wrapper/Stack';
import Section from '../../ui/wrapper/Section';
import Container from '../../ui/wrapper/Container';
import Button from '../../ui/button/Button';
import Text from '../../ui/textual/Text';
import styles from "./HomeSecondSection.module.css";
import InvisibleLink from '../../ui/button/InvisibleLink';

const HomeSecondSection = ({ content }) => {
  console.log(content)
  const [isClient, setIsClient] = useState(false);
  const bentoDivRef = useRef(null);
  const parentBentoDivRef = useRef(null);
  const sectionRef = useRef(null);
  const parentBentoPosition = { x: 0, y: 0, rotation: 0 };
  const bentoPosition = { x: 0, y: 0, rotation: 0 };

  useEffect(() => {
    setIsClient(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const parentBentoDiv = parentBentoDivRef.current;
    const bentoDiv = bentoDivRef.current;
    const section = sectionRef.current;

    if (!parentBentoDiv || !bentoDiv || !section) return;

    const scrollTween = gsap.to(parentBentoDiv, {
      rotation: -10,
      x: 10,
      y: 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: () => {
          parentBentoPosition.x = gsap.getProperty(parentBentoDiv, "x");
          parentBentoPosition.y = gsap.getProperty(parentBentoDiv, "y");
          parentBentoPosition.rotation = gsap.getProperty(parentBentoDiv, "rotation");
        },
      },
    });

    const handleMouseMove = (e) => {
      const { width, height, top, left } = bentoDiv.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      gsap.to(bentoDiv, {
        x: bentoPosition.x + x * 0.1,
        y: bentoPosition.y + y * 0.1,
        rotation: bentoPosition.rotation,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(bentoDiv, {
        x: bentoPosition.x,
        y: bentoPosition.y,
        rotation: bentoPosition.rotation,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    bentoDiv.addEventListener('mousemove', handleMouseMove);
    bentoDiv.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bentoDiv.removeEventListener('mousemove', handleMouseMove);
      bentoDiv.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollTween) scrollTween.kill();
    };
  }, [isClient]);

  return (
    <Section ref={sectionRef} highlight={true}>
      <Container 
        direction={content.direction ? "row-reverse" : "row"} 
        width={"full"} 
        maxwidth={"xl"} 
        align={"center"}
      >
        <Stack width={"60%"} justify={"center"}>
          <div ref={parentBentoDivRef} className={styles.bentoParentDiv}>
            <figure ref={bentoDivRef} className={styles.bentoDiv}>
              <img 
                src={content.image.node.sourceUrl} 
                alt={content.image.node.altText} 
                className={styles.video} 
              />
              <Stack>
                <Text>{content.link.title}</Text>
              </Stack>
              {content.link && (
                <InvisibleLink 
                  lineheight={"0"} 
                  href={content.link.url} 
                  target={"_blank"}
                />
              )}
            </figure>
          </div>
        </Stack>
        <Stack direction={"column"} width={"40%"} spacing={"20px"}>
          <div className="flex directionColumn spacing_sm txt_group" dangerouslySetInnerHTML={{ __html: content.text }}/>
          {content.button && (
            <Button 
              className={"step-1"} 
              variant={"primary"} 
              href={content.button.url} 
              transition
            >
              {content.button.title}
            </Button>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

export default HomeSecondSection;
