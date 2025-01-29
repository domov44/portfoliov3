import React from 'react';
import Link from 'next/link';
import styles from './InvisibleLink.module.css';
import { useInstantUrlTransition } from '../../../utils/useInstantUrlTransition';

const InvisibleLink = ({ href, children, lineheight, onClick, transition = false, target }) => {
    const handleTransition = useInstantUrlTransition();
    const Component = href ? Link : 'button';

    const handleClick = (event) => {
        if (href && transition) {
            handleTransition(href, event);
        } else if (onClick) {
            onClick(event);
        }
    };

    return (
        <Component
            {...(href && { href, target })}
            onClick={handleClick}
            className={styles.linkButton}
            style={{ lineHeight: lineheight || 'normal' }}
        >
            {children}
        </Component>
    );
};

export default InvisibleLink;
