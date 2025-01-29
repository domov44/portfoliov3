import React, { forwardRef } from "react";
import styles from "./Title.module.css";

const Title = forwardRef(({
  data_cy,
  level = 1,
  className = "",
  onClick,
  children,
}, ref) => {
  const HeadingTag = `h${level}`;

  const dynamicClasses = [
    styles.title,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <HeadingTag
      className={dynamicClasses}
      data-cy={data_cy}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </HeadingTag>
  );
});

export default Title;
