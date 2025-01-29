import React from "react";
import styles from "./Text.module.css";

const Text = ({
  variant = "default",
  textalign = "left",
  className,
  id,
  onClick,
  children,
  maxwidth,
  fontfamily,
  ...restProps
}) => {
  const combinedClassName = `${styles.text} ${styles[variant]} ${className || ""}`;

  const inlineStyles = {
    textAlign: textalign,
    maxWidth: maxwidth,
    fontFamily: fontfamily,
  };

  return (
    <p
      className={combinedClassName}
      style={inlineStyles}
      id={id}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </p>
  );
};

export default Text;
