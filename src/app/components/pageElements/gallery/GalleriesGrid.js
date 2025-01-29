"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import styles from './GalleriesGrid.module.css';

const GalleriesGrid = ({ galleriesElements }) => {
    const [hoveredGallery, setHoveredGallery] = useState(null);
    const ulRef = useRef(null);
    const liRefs = useRef([]);
    const pictureRefs = useRef([]);
    const imgRefs = useRef([]);

    const galleryItems = useMemo(() => {
        if (galleriesElements.length >= 15) return galleriesElements;

        const items = [...galleriesElements];
        while (items.length < 15) {
            const randomIndex = Math.floor(Math.random() * galleriesElements.length);
            const originalGallery = galleriesElements[randomIndex];

            items.push({
                ...originalGallery,
                id: `${originalGallery.id}-duplicate-${items.length}`,
                place: `${originalGallery.place}`,
                date: originalGallery.date,
                url: originalGallery.url,
                alt: originalGallery.alt
            });
        }
        return items;
    }, [galleriesElements]);

    useEffect(() => {
        const ulElement = ulRef.current;
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;
        let gridWidth = ulElement.scrollWidth;
        let gridHeight = ulElement.scrollHeight;

        const updateDimensions = () => {
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
            gridWidth = ulElement.scrollWidth;
            gridHeight = ulElement.scrollHeight;
        };

        window.addEventListener("resize", updateDimensions);

        const animationConfig = {
            duration: 1.2,
            ease: "power4.out",
        };

        imgRefs.current.forEach((img) => {
            if (img) gsap.set(img, { scale: 1.3 });
        });

        const handleMouseMove = (e) => {
            const mouseXRatio = e.clientX / viewportWidth;
            const mouseYRatio = e.clientY / viewportHeight;

            const targetX = Math.min(0, Math.max(-(gridWidth - viewportWidth),
                -(gridWidth - viewportWidth) * (mouseXRatio * 0.95)));
            const targetY = Math.min(0, Math.max(-(gridHeight - viewportHeight),
                -(gridHeight - viewportHeight) * (mouseYRatio * 0.95)));

            gsap.to(ulElement, {
                x: targetX,
                y: targetY,
                ...animationConfig,
                overwrite: true,
            });

            imgRefs.current.forEach((img) => {
                if (!img) return;
                const rect = img.getBoundingClientRect();
                const imgCenterX = rect.left + rect.width / 2;
                const imgCenterY = rect.top + rect.height / 2;

                const deltaX = (imgCenterX - viewportWidth / 2) / viewportWidth;
                const deltaY = (imgCenterY - viewportHeight / 2) / viewportHeight;

                gsap.to(img, {
                    x: deltaX * -45,
                    y: deltaY * -45,
                    overwrite: true,
                    duration: 0.8,
                    ease: "power4.out",
                });
            });
        };

        let lastTime = 0;
        const throttleDelay = 16;

        const throttledHandleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime >= throttleDelay) {
                handleMouseMove(e);
                lastTime = now;
            }
        };

        ulElement.addEventListener('mousemove', throttledHandleMouseMove);

        liRefs.current.forEach((li, index) => {
            if (!li) return;

            const picture = pictureRefs.current[index];
            const galleryData = galleryItems[index];

            if (!galleryData || !picture) return;

            const initialPosition = { x: 0, y: 0, rotation: 0 };

            const handleLiMouseEnter = () => {
                setHoveredGallery({
                    place: galleryData.place,
                    date: galleryData.date
                });
                gsap.killTweensOf(picture);
                gsap.to(picture, {
                    scale: 1.08,
                    duration: 1.8,
                    ease: "power4.out",
                });
            };

            const handleLiMouseMove = (e) => {
                const { width, height, top, left } = li.getBoundingClientRect();
                const x = e.clientX - left - width / 2;
                const y = e.clientY - top - height / 2;

                gsap.to(picture, {
                    x: initialPosition.x + x * 0.15,
                    y: initialPosition.y + y * 0.15,
                    rotation: initialPosition.rotation,
                    duration: 1.8,
                    ease: "power4.out",
                });
            };

            const handleLiMouseLeave = () => {
                setHoveredGallery(null);
                gsap.killTweensOf(picture);
                gsap.to(picture, {
                    x: initialPosition.x,
                    y: initialPosition.y,
                    rotation: initialPosition.rotation,
                    scale: 1,
                    duration: 1.8,
                    ease: "power4.out",
                });
            };

            li.addEventListener('mouseenter', handleLiMouseEnter);
            li.addEventListener('mousemove', handleLiMouseMove);
            li.addEventListener('mouseleave', handleLiMouseLeave);

            return () => {
                li.removeEventListener('mouseenter', handleLiMouseEnter);
                li.removeEventListener('mousemove', handleLiMouseMove);
                li.removeEventListener('mouseleave', handleLiMouseLeave);
            };
        });

        return () => {
            ulElement.removeEventListener('mousemove', throttledHandleMouseMove);
            window.removeEventListener("resize", updateDimensions);
        };
    }, [galleryItems]);

    return (
        <>
            <ul ref={ulRef} className={styles.GalleryGridList}>
                {galleryItems.map((gallery, index) => (
                    <li
                        ref={(el) => (liRefs.current[index] = el)}
                        key={gallery.id}
                        className={styles.GalleryGridListItem}
                    >
                        <picture className={styles.GalleryPicture} ref={(el) => (pictureRefs.current[index] = el)}>
                            <img
                                ref={(el) => (imgRefs.current[index] = el)}
                                src={gallery.url}
                                alt={gallery.alt || "Gallery Image"}
                                className={styles.GalleryImage}
                            />
                        </picture>
                    </li>
                ))}
            </ul>
            <div className={styles.GalleryInformationSection}>
                <h1 className="step-2">
                    {hoveredGallery?.place || "Travel place"}
                </h1>
                <p>{hoveredGallery ? new Date(hoveredGallery.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2') : "Travel date"}</p>
            </div>
        </>
    );
};

export default GalleriesGrid;