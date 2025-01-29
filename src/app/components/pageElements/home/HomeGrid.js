"use client";
import React from 'react';
import Title from '../../ui/textual/Title';
import Stack from '../../ui/wrapper/Stack';
import Section from '../../ui/wrapper/Section';
import Container from '../../ui/wrapper/Container';
import Button from '../../ui/button/Button';
import styles from './HomeGrid.module.css';
import InvisibleLink from '../../ui/button/InvisibleLink';

const HomeGrid = ({ videos }) => {
  return (
    <Section fullWidth>
      <Container direction="column" width="100%" maxwidth="1200px">
        <Stack width="100%" justify="center">
          <Title level={2} className="colored font8vw zIndex_-1 text_align_center w60vw ln0_8">
            PROJECT SHOWCASE
          </Title>
        </Stack>
        <div className={styles.projectGrid}>
          {videos.map((video, index) => (
            <article key={index} className={styles.gridItem}>
              <video
                className={styles.video}
                src={video.video}
                autoPlay
                loop
                muted
                playsInline
              />
              <InvisibleLink lineheight={"0"} href={`/work/${video.slug}`} transition>View project</InvisibleLink>
            </article>
          ))}
        </div>
        <Stack width="100%" justify="center" margin="-30vw 0 0 0">
          <Button transition className="step-1" href="/work">all projects</Button>
        </Stack>
      </Container>
    </Section>
  );
};

export default HomeGrid;
