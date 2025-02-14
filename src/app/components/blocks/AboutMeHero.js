"use client"
import TextLink from '../ui/textual/TextLink';
import Title from '../ui/textual/Title';
import Section from '../ui/wrapper/Section';
import Stack from '../ui/wrapper/Stack';
import styles from './AboutMeHero.module.css'

const AboutMeHero = ({ leftUrl, rightUrl, heading }) => {
    return (
        <Section>
            <Stack direction={"column"} width={"100%"} height={"calc(50vh - 80px)"} justify={"flex-end"}>
                <div className={styles.home_hero_content}>
                    <div className={styles.home_hero_title}>
                        <Title level={6} className="text_align_center default">{heading}</Title>
                    </div>
                    <ul className={styles.home_hero_link}>
                        <li className={styles.home_hero_link_item}>
                            <TextLink href={leftUrl.url} target={leftUrl.url.startsWith('https://') ? '_blank' : undefined}>{leftUrl.title}</TextLink>
                        </li>
                        <li className={styles.home_hero_link_item}>
                            <TextLink href={rightUrl.url} target={rightUrl.url.startsWith('https://') ? '_blank' : undefined}>{rightUrl.title}</TextLink>
                        </li>
                    </ul>
                </div>
            </Stack>
        </Section>
    );
}

export default AboutMeHero;