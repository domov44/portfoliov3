import React from "react";
import styled from "styled-components";

const TdComponent = styled.td`
padding: var(--table-cell-padding);
border-bottom: solid 1px var(--grey-color);
  background: ${(props) =>
    props.$variant === "basique"
      ? "var(--bg-color)"
      : props.$variant === "success"
      ? "var(--success-bg)"
      : props.$variant === "danger"
      ? "var(--error-bg)"
      : "var(--bg-color)"};
  color: ${(props) =>
    props.$variant === "basique"
      ? "var(--color-title)"
      : props.$variant === "success"
      ? "var(--success-bg)"
      : props.$variant === "danger"
      ? "var(--error-bg)"
      : "var(--color-title)"};
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

const Td = ({ variant, size, className, id, onClick, children, ...restProps }) => {
  return (
    <TdComponent $variant={variant} size={size} {...restProps}>
      {children}
    </TdComponent>
  );
};

export default Td;