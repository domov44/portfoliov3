import styles from './Main.module.css';

import React, { forwardRef } from 'react';

const Main = forwardRef(({ children }, ref) => {
  return <main className={styles.main}  ref={ref}>{children}</main>;
});

export default Main;
