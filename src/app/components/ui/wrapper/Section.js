import React from 'react';
import styles from './Section.module.css';

const Section = React.forwardRef(({ 
    children, 
    highlight, 
    overflow, 
    height, 
    justify, 
    margin, 
    spacing, 
    padding, 
    fullWidth, 
    className 
}, ref) => {
    return (
        <section 
            ref={ref}
            className={`
                ${styles.section} 
                ${highlight ? styles.highlight : ''} 
                ${overflow ? styles.overflowVisible : ''} 
                ${fullWidth ? styles.fullWidth : ''} 
                ${spacing ? styles[`spacing_${spacing}`] : styles.defaultSpacing}
                ${margin ? styles[`margin_${margin}`] : styles.defaultMargin}
                ${height ? styles[`height_${height}`] : ''}
                ${className || `align_center justify_center ${styles.defaultPadding}`}
            `.trim()}
        >
            {children}
        </section>
    );
});

export default Section;