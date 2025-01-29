import React from 'react';
import Link from 'next/link';
import { useInstantUrlTransition } from '../../../utils/useInstantUrlTransition';
import styles from './MegaMenuItem.module.css';


const MegaMenuItem = ({ href, children, className, onClick, transition = false, delay = 700 }) => {
  const handleTransition = useInstantUrlTransition(delay);

  return (
    <Link
      href={href}
      className={styles.mega_menu_item}
      onClick={event => {
        if (transition) {
          handleTransition(href, event);
        }
        if (onClick) {
          onClick();
        }
      }}
      onMouseDown={transition ? (event) => event.preventDefault() : undefined}
    >
      {children}
    </Link>
  );
};

export default MegaMenuItem;
