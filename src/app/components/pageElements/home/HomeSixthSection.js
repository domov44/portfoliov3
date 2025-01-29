"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '../../ui/textual/Title';
import Stack from '../../ui/wrapper/Stack';
import Section from '../../ui/wrapper/Section';
import Container from '../../ui/wrapper/Container';
import Button from '../../ui/button/Button';
import Text from '../../ui/textual/Text';
import styles from "./HomeSixthSection.module.css";
import InvisibleLink from '../../ui/button/InvisibleLink';

gsap.registerPlugin(ScrollTrigger);

const HomeSixthSection = ({ bento }) => {
  const bentoDivRef = useRef(null);
  const parentBentoDivRef = useRef(null);
  const sectionRef = useRef(null);
  const parentBentoPosition = { x: 0, y: 0, rotation: 0 };
  const bentoPosition = { x: 0, y: 0, rotation: 0 };

  useEffect(() => {
    const parentBentoDiv = parentBentoDivRef.current;
    const bentoDiv = bentoDivRef.current;
    const section = sectionRef.current;

    const scrollTween = gsap.to(parentBentoDiv, {
      rotation: -10,
      x: 10,
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
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
      scrollTween.kill();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <Stack>
        <Title level={2} className="colored font8vw zIndex_-1 text_align_center w60vw ln0_8">
          LET'S DO SOMETHING AWESOME TOGETHER
        </Title>
      </Stack>
      <Container direction={"row"} width={"full"} maxwidth={"xl"} align={"center"}>
        <Stack width={"60%"} justify={"center"}>
          <div ref={parentBentoDivRef} className={styles.bentoParentDiv}>
            {bento.map((item, index) => (
              <figure key={index} ref={bentoDivRef} className={styles.bentoDiv}>
                {item.fileType.startsWith("image") ? (
                  <img src={item.file} alt={item.label} className={styles.video} />
                ) : item.fileType.startsWith("video") ? (
                  <video
                    src={item.file}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                  ></video>
                ) : null}
                < Stack >
                  <Text>{item.label}</Text>
                </Stack>
                {item.href && (
                  <InvisibleLink lineheight={"0"} href={item.href} target={"_blank"}>{item.href}</InvisibleLink>
                )}
              </figure>
            ))}
          </div>
        </Stack>
        <Stack direction={"column"} width={"40%"} spacing={"20px"}>
          <Title level={3} className={"default step-1"}>
            I'm excited just to imagine our future collaboration.
          </Title>
          <Stack direction={"column"}>
            <Text>
              Make room for your vision and stand out from the crowd.
            </Text>
            <Title level={4} className={"default step-0"}>
              Hit me up and let's schedule a call.
            </Title>
          </Stack>
          <Button className={"step-1"} variant={"primary"} target={"_blank"} href="https://www.linkedin.com/in/ronan-scotet-concepteur-web/">contact</Button>
        </Stack>
      </Container>
    </Section>
  );
};

export default HomeSixthSection;
