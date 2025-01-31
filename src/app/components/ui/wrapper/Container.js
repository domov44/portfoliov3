import React from 'react';
import styles from './Container.module.css';

function Container({ maxwidth, direction, align, justify, children, width, responsive }) {
  const directionClass = 
    direction === 'row' ? styles.directionRow :
    direction === 'column' ? styles.directionColumn :
    direction === 'row-reverse' ? styles.directionRowReverse : 
    '';

  return (
    <div className={[
      styles.container,
      directionClass,
      align === 'center' ? styles.alignCenter : '',
      styles[`justify_${justify || 'start'}`] || '',
      responsive === 'yes' ? styles.responsive : '',
      width ? styles[`width_${width}`] : '',
      maxwidth ? styles[`maxWidth_${maxwidth}`] : ''
    ].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export default Container;
