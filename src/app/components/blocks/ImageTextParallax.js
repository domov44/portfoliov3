'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '../ui/textual/Title';
import Stack from '../ui/wrapper/Stack';
import Section from '../ui/wrapper/Section';
import styles from './ImageTextParallax.module.css';
import Container from '../ui/wrapper/Container';
import Button from '../ui/button/Button';
import Text from '../ui/textual/Text';
import InvisibleLink from '../ui/button/InvisibleLink';

const ImageTextParallax = ({ backgroundImage, heading, button, image, link, text, direction }) => {
    const sectionRef = useRef(null);
    const imageBgRef = useRef(null);

    const bentoDivRef = useRef(null);
    const parentBentoDivRef = useRef(null);
    const parentBentoPosition = { x: 0, y: 0, rotation: 0 };
    const bentoPosition = { x: 0, y: 0, rotation: 0 };

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
                    end: `bottom top`,
                    scrub: true,
                },
            });


        }
    }, []);

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

        <Section fullWidth>
            <Stack width="100%" ref={sectionRef} className="scroll-section" position="relative" direction="column" overflow height="160vh" justify="start" padding="0px 0px 70vh 0px" spacing="100px">
                <Stack padding="50vh 0px 0px 0px" direction="column" width="100%" align="center" spacing="10vw">
                    <Stack width="100%" justify="center">
                        <Title level={2} className="colored font8vw text_align_center w70vw ln0_8">
                            {heading}
                        </Title>
                    </Stack>
                    <Container direction={direction ? "row-reverse" : "row"} width={"full"} maxwidth={"xl"} align={"center"}>
                        <Stack direction={"column"} width={"40%"} spacing={"20px"}>
                            <div className="flex directionColumn spacing_sm txt_group" dangerouslySetInnerHTML={{ __html: text }} />
                            {button && (
                                <Button
                                    className={"step-1"}
                                    variant={"primary"}
                                    href={button.url}
                                    target={button.url.startsWith('https://') ? '_blank' : undefined}
                                    transition={!button.url.startsWith('https://')}
                                >
                                    {button.title}
                                </Button>
                            )}
                        </Stack>
                        <Stack width={"60%"} justify={"center"}>
                            <div ref={parentBentoDivRef} className={styles.bentoParentDiv}>
                                <figure ref={bentoDivRef} className={styles.bentoDiv}>
                                    <img src={image.sourceUrl} alt={image.altText} className={styles.video} />
                                    < Stack >
                                        <Text>{link.title}</Text>
                                    </Stack>
                                    {link && (
                                        <InvisibleLink lineheight={"0"} href={link.url} target={"_blank"}>{link.title}</InvisibleLink>
                                    )}
                                </figure>
                            </div>
                        </Stack>
                    </Container>
                </Stack>
                <figure className={styles.image_section}>
                    <img className={styles.image_bg} ref={imageBgRef} src={backgroundImage.sourceUrl} alt={backgroundImage.altText} />
                </figure>
            </Stack>
        </Section>

    );
};

export default ImageTextParallax;