"use client"
import React from 'react';
import Link from 'next/link';
import { useInstantUrlTransition } from '../../../utils/useInstantUrlTransition';
import styles from './TextLink.module.css';


const TextLink = ({ href, children, className, transition = false, delay = 5000 }) => {
    const handleTransition = useInstantUrlTransition(delay);

    return (
        <Link
            href={href}
            className={`${styles.text_link} ${className}`}
            onClick={transition ? (event) => handleTransition(href, event) : undefined}
            onMouseDown={transition ? (event) => event.preventDefault() : undefined}
        >
            {children}
        </Link>
    );
};

export default TextLink;
