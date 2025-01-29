import React from 'react';
import styles from './Container.module.css';

function Container({ maxwidth, direction, align, justify, children, width, responsive }) {
  return (
    <div className={`
      ${styles.container}
      ${direction === 'row' ? styles.directionRow : styles.directionColumn}
      ${align === 'center' ? styles.alignCenter : ''}
      ${styles[`justify_${justify || 'start'}`]}
      ${responsive === 'yes' ? styles.responsive : ''}
      ${width ? styles[`width_${width}`] : ''}
      ${maxwidth ? styles[`maxWidth_${maxwidth}`] : ''}
    `.trim()}>
      {children}
    </div>
  );
}

export default Container;