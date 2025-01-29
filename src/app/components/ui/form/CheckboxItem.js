import React from "react";
import styled from "styled-components";

const CheckboxComponent = styled.input`
position: relative;
  border: 1px solid currentColor;
  accent-color: var(--main-color);
  cursor: pointer;
  width: 18px;
  height: 18px;

  &:hover {
    border: 1px solid var(--main-color);
  }

  &:hover:after{
    opacity:0.1;
    visibility: visible;
  }

  &:active:after{
    opacity:0.2;
    visibility: visible;
  }

  &:after{
    transition: 0.3s;
    left: -11px;
    top: -11px;
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: var(--color-title);
    opacity: 0;
    border-radius: 50px;
  }
`;

const StyledLabel = styled.label`
  color: var(--paragraph);
  display: flex;
  align-items: center;
  gap:10px;
  width: fit-content;
`;

const Checkbox = ({ type, variant, enable, className, id, onClick, value, checked, onChange, label }) => {
  return (
    <StyledLabel>
      <CheckboxComponent
        type="checkbox"
        variant={variant}
        enable={enable}
        className={className}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </StyledLabel>
  );
};

export default Checkbox;