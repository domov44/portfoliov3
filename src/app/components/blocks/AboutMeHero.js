"use client"
import TextLink from '../ui/textual/TextLink';
import Title from '../ui/textual/Title';
import Section from '../ui/wrapper/Section';
import Stack from '../ui/wrapper/Stack';

const AboutMeHero = ({leftUrl, rightUrl, heading}) => {
    return (
        <Section >
            <Stack direction={"column"} width={"100%"} height={"calc(50vh - 80px)"} justify={"flex-end"}>
                <Stack justify={"space-between"} width={"100%"} zIndex={2} animationType={"animateFadeIn"} opacity={"0"}>
                    <Stack width={"33.3%"}>
                        <TextLink href={leftUrl.url} target={leftUrl.url.startsWith('https://') ? '_blank' : undefined}>{leftUrl.title}</TextLink>
                    </Stack>
                    <Stack width={"33.3%"} justify={"center"}>
                        <Title level={6} className="default">{heading}</Title>
                    </Stack>
                    <Stack width={"33.3%"} justify={"end"}>
                        <TextLink href={rightUrl.url} target={rightUrl.url.startsWith('https://') ? '_blank' : undefined}>{rightUrl.title}</TextLink>
                    </Stack>
                </Stack>
            </Stack>
        </Section>
    );
}

export default AboutMeHero;