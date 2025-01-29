import React from 'react';
import styled from 'styled-components';

const TextInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: solid 1px;
  border-color: ${(props) =>
    props.$variant === 'blue'
      ? 'var(--paragraph)'
      : props.$variant === 'green'
        ? 'var(--main-color)'
        : props.$variant === 'white'
          ? 'var(--bg-color)'
          : 'var(--paragraph)'};
  color: ${(props) =>
    props.$variant === 'blue'
      ? 'var(--paragraph)'
      : props.$variant === 'green'
        ? 'var(--main-color)'
        : props.$variant === 'white'
          ? 'var(--bg-color)'
          : 'var(--paragraph)'};
  padding: 10px 14px;
  font-size: 20px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:focus {
    border-color: var(--main-color);
    color: var(--main-color);
    outline: none;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    color: var(--main-color);
    transform: translateY(-22px);
    font-size: 0.75rem;
    font-weight: 600;
    background-color: var(--secondary-bg-color);
    opacity: 1;
  }

  &:not(:focus) + label {
    color: var(--color-title);
  }
`;

const Label = styled.label`
    line-height: 1;
    position: absolute;
    left: 9px;
    padding: 0px 5px;
    font-size: 16px;
    color: var(--color-title);
    pointer-events: none;
    transition: all 0.2s ease-in-out 0s;
    opacity: 0.7;
`;

const TextInput = ({ label, type, variant, className, id, onClick, children, ...restProps }) => {
  return (
    <TextInputContainer>
      <Input {...restProps} type={type} $variant={variant} className={className} id={id} onClick={onClick} placeholder=" " />
      <Label>{label}</Label>
    </TextInputContainer>
  );
};

export default TextInput;