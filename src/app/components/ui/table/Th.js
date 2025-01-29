import React from "react";
import styled from "styled-components";

const ThComponent = styled.th`
white-space: nowrap;
text-align: start;
border-collapse: collapse;
padding: var(--table-cell-padding);
  background: ${(props) =>
    props.$variant === "basique"
      ? "var(--bg-color)"
      : props.$variant === "success"
      ? "var(--success-bg)"
      : props.$variant === "danger"
      ? "var(--error-bg)"
      : "none"};
  color: ${(props) =>
    props.$variant === "basique"
      ? "var(--colored-text)"
      : props.$variant === "success"
      ? "var(--success-color)"
      : props.$variant === "danger"
      ? "var(--error-color)"
      : "none"};
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

  &:first-child{
    border-top-left-radius: var(--table-border-radius);
  }

  &:last-child{
    border-top-right-radius: var(--table-border-radius);
  }
`;

const Th = ({ variant, size, className, id, onClick, children, ...restProps }) => {
  return (
    <ThComponent $variant={variant} size={size} {...restProps}>
      {children}
    </ThComponent>
  );
};

export default Th;
