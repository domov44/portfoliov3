'use client';

import React, { useEffect, useRef } from 'react';
import * as Matter from 'matter-js';
import Title from '../ui/textual/Title';
import styles from './Mattershapes.module.css'
const MatterShapes = ({ images, heading }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current || images.length === 0) return;

    const { Engine, Render, Runner, MouseConstraint, Mouse, Composite, Bodies } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const width = sceneRef.current.offsetWidth;
    const height = window.innerHeight * 0.8;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: '#121016',
      },
    });
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    Composite.add(world, [
      Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(width / 2, height, width, 50, {
        isStatic: true,
        render: { visible: true, fillStyle: '#1A1821' },
      }),
      Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
    ]);

    const isMobile = window.innerWidth <= 768;
    const radius = isMobile ? 25 : 50;
    const cols = isMobile ? 3 : 7;
    const spacingX = isMobile ? 50 : 80;
    const spacingY = isMobile ? 30 : 80;
    const offsetX = (width - cols * spacingX) / 2 + radius;

    images.forEach((imageSrc, index) => {
      const x = offsetX + (index % cols) * spacingX;
      const y = 100 + Math.floor(index / cols) * spacingY;

      Composite.add(world, Bodies.circle(x, y, radius, {
        restitution: 0.4,
        render: {
          sprite: {
            texture: imageSrc,
            xScale: (radius * 2) / 400,
            yScale: (radius * 2) / 400,
          },
        },
      }));
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [images]);

  return (
    <section className={styles.matter_section}>
      {heading && <Title level={2} className="default text_align_center">{heading}</Title>}
      <div className={styles.matter_scene} ref={sceneRef} />
    </section>
  );
};

export default MatterShapes;
