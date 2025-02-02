"use client"
import React from 'react';
import Stack from '../ui/wrapper/Stack';
import Section from '../ui/wrapper/Section';
import Container from '../ui/wrapper/Container';
import Button from '../ui/button/Button';

const TextTextSection = ({ left, right }) => {
    return (
        <Section >
            <Container direction={"row"} width={"full"} maxwidth={"xl"} align={"center"}>
                <Stack width={"40%"} justify={"center"}>
                    <div className="flex directionColumn spacing_sm txt_group" dangerouslySetInnerHTML={{ __html: left.text }} />
                </Stack>
                <Stack direction={"column"} width={"60%"} spacing={"20px"} align="center">
                    <div className="flex directionColumn spacing_sm txt_group w20vw" dangerouslySetInnerHTML={{ __html: right.text }} />
                    <Button className={"step-1"} variant={"primary"} href={right.button.sourceUrl} target={"_blank"}>
                        {right.button.title}
                    </Button>
                </Stack>
            </Container>
        </Section>
    );
};

export default TextTextSection;