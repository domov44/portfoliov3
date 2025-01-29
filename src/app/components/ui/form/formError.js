import React from "react";
import styled from "styled-components";

const FormErrorComponent = styled.span`
  color: ${(props) =>
    props.$variant === "error"
      ? "var(--error-color)"
      : props.$variant === "success"
      ? "var(--success-color)"
      : "none"};
  background: ${(props) =>
    props.$variant === "error"
      ? "var(--error-bg)"
      : props.$variant === "success"
      ? "var(--success-bg)"
      : "none"};
  
  padding: 8px 15px;
  border-radius: 5px;
`;

const FormError = ({ variant, size, className, id, onClick, children, ...restProps }) => {
  return (
    <FormErrorComponent $variant={variant} size={size} {...restProps}>
      {children}
    </FormErrorComponent>
  );
};

export default FormError;