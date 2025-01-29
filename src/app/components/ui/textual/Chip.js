import React from "react";
import styled from "styled-components";

const ChipComponent = styled.span`
line-height: 1;
height: fit-content;
gap:5px;
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
    color: ${props =>
    props.$variant === "primary"
      ? "var(--colored-text)"
      : props.$variant === "secondary"
        ? "var(--color-title)"
        : props.$variant === "success"
          ? "var(--success-color)"
          : props.$variant === "danger"
          ? "var(--error-color)"           
          : props.$variant === "warning"
          ? "var(--warning-color)" : "var(--color-title)"};
  background: ${props =>
    props.$variant === "primary"
      ? "var(--nav-bg-hover)"
      : props.$variant === "secondary"
        ? "var(--secondary-color)"
        : props.$variant === "success"
          ? "var(--success-bg)"
          : props.$variant === "danger"
          ? "var(--error-bg)"           
          : props.$variant === "warning"
          ? "var(--warning-bg)" : "var(--color-title)"};
  border:  none;
  padding: 8px 10px;
  font-size: ${(props) => {
    switch (props["size"]) {
      case "sm":
        return "16px";
      case "md":
        return "18px";
      case "lg":
        return "20px";
      default:
        return "18px";
    }
  }};
  border-radius: 50PX;
  margin: 0;
`;


const Chip = ({ variant, className, id, width, children, icon: Icon, ...restProps }) => {
  return (
    <ChipComponent
      $variant={variant}
      {...restProps}
      width={width}
      className={className ? `chip ${className}` : "chip"}
      id={id}
    >
      {Icon && <Icon />}
      {children}
    </ChipComponent>

  );
};

export default Chip;