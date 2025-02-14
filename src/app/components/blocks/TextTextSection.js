"use client"
import React from 'react';
import Stack from '../ui/wrapper/Stack';
import Section from '../ui/wrapper/Section';
import Button from '../ui/button/Button';
import styles from './TextTextSection.module.css'

const TextTextSection = ({ left, right }) => {
    return (
        <Section>
            <div className={styles.container}>
                <div className={styles.paragraph_wrapper}>
                    <div className="flex directionColumn spacing_sm txt_group" dangerouslySetInnerHTML={{ __html: left.text }} />
                </div>
                <div className={styles.content_wrapper}>
                    <div className={`flex directionColumn spacing_sm txt_group ${styles.text_wrapper}`} dangerouslySetInnerHTML={{ __html: right.text }} />
                    <Button className={"step-1"} variant={"primary"} href={right.button.sourceUrl} target={"_blank"}>
                        {right.button.title}
                    </Button>
                </div>
            </div>
        </Section>
    );
};

export default TextTextSection;