'use client';

import React, { useEffect, useRef } from 'react';
import * as Matter from 'matter-js';
import Title from '../ui/textual/Title';
import styles from './Mattershapes.module.css';

const MatterShapes = ({ images, heading, layers }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current || (images.length === 0 && layers.length === 0)) return;

    const { Engine, Render, Runner, MouseConstraint, Mouse, Composite, Bodies, Constraint, Events } = Matter;

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
    const pillHeight = isMobile ? 30 : 50;

    const totalLayers = layers.length;
    const layerSpacing = width / (totalLayers + 1);

    const layerPills = layers.map((layer, index) => {
      const textWidth = layer.label.length * (isMobile ? 10 : 15);
      const pillWidth = textWidth + 40;
      const x = (index + 1) * layerSpacing;
      const y = 50;

      const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.6,
        chamfer: { radius: pillHeight / 2 },
        render: {
          fillStyle: layer.background,
        },
      });

      const constraint = Constraint.create({
        bodyB: body,
        pointA: { x, y },
        stiffness: 0.01,
        damping: 0.1,
        render: { visible: false },
      });

      Composite.add(world, [body, constraint]);

      return {
        body,
        label: layer.label,
        color: layer.color,
        pillWidth,
        pillHeight,
      };
    });

    const preloadImages = images.map(({ url, label, background, color }) => {
      const img = new Image();
      img.src = url;
      return { img, label, url, background, color };
    });

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.font = isMobile ? '18px ClashDisplay' : '25px ClashDisplay';

    const cols = isMobile ? 4 : 8;
    const spacingX = width / (cols + 1);
    const spacingY = isMobile ? 30 : 50;

    const bodiesWithContent = preloadImages.map(({ img, label, background, color }, index) => {
      const textWidth = tempCtx.measureText(label).width;
      const imgSize = (pillHeight - 10) * 0.7;
      const padding = 30;
      const pillWidth = textWidth + imgSize + padding;

      const x = (index % cols) * spacingX + spacingX / 2;
      const y = 100 + Math.floor(index / cols) * spacingY;

      const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.4,
        chamfer: { radius: pillHeight / 2 },
        render: {
          fillStyle: background || '#1A1821',
        },
      });

      Composite.add(world, body);

      return {
        body,
        label: label || `Item ${index + 1}`,
        img,
        background,
        color,
        pillWidth,
        pillHeight,
        imgSize,
      };
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

    Events.on(render, 'afterRender', () => {
      const context = render.context;

      bodiesWithContent.forEach(({ body, label, img, background, color, pillWidth, pillHeight, imgSize }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        context.fillStyle = background || '#1A1821';
        context.beginPath();
        context.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, pillHeight / 2);
        context.fill();

        context.fillStyle = color || '#FFFFFF';
        context.font = isMobile ? '18px ClashDisplay' : '25px ClashDisplay';
        context.textAlign = 'left';
        context.fillText(label, -pillWidth / 2 + imgSize + 15, 5);

        if (img.complete) {
          context.drawImage(img, -pillWidth / 2 + 10, -imgSize / 2, imgSize, imgSize);
        }

        context.restore();
      });

      layerPills.forEach(({ body, label, color }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        context.fillStyle = color || '#FFFFFF';
        context.font = isMobile ? '18px ClashDisplay' : '25px ClashDisplay';
        context.textAlign = 'center';
        context.fillText(label, 0, 5);

        context.restore();
      });
    });

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
  }, [images, layers]);

  return (
    <section className={styles.matter_section}>
      {heading && <Title level={2} className="default text_align_center">{heading}</Title>}
      <div className={styles.matter_scene} ref={sceneRef} />
    </section>
  );
};

export default MatterShapes;
