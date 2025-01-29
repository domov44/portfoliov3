import React from 'react';
import styled from 'styled-components';

const DialogElement = styled.dialog`
padding: 30px;
  position: fixed;
  top: 50%;
  max-width: 500px;
  transform: translatey(-50%);
  border: 
  ${props =>
    props.$variant === "danger"
      ? "1px solid var(--error-color);"
      : props.$variant === "success"
      ? "1px solid var(--success-color);"
      : "1px solid var(--paragraph);"};
  background-color: var(--bg-color);
  z-index: 1000; 
  border-radius: 5px;
`;

function Dialog({ children, open, onCancel, variant }) {
  if (!open) return null;
  
  return (
    <DialogElement open={open} onCancel={onCancel} $variant={variant}>
      {children}
    </DialogElement>
  );
}

export default Dialog;