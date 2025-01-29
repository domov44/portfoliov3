import React, { useState } from 'react';
import styled from 'styled-components';
import { PiEyeClosed, PiEye } from 'react-icons/pi';

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PasswordComponent = styled.input`
    width: 100%;
  border: solid 1px;
  border-color: ${(props) =>
    props.$variant === 'blue'
      ? 'var(--paragraph)'
      : props.$variant === 'green'
      ? 'var(--main-color)'
      : props.$variant === 'white'
      ? 'var(--bg-color)'
      : 'none'};
  color: ${(props) =>
    props.$variant === 'blue'
      ? 'var(--color-title)'
      : props.$variant === 'green'
      ? 'var(--main-color)'
      : props.$variant === 'white'
      ? 'var(--bg-color)'
      : 'none'};
  padding: 10px 14px;
  padding-right: 40px;
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

const EyeShowPassword = styled.button`
  line-height: 0;
  color: var(--color-title);
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
`;

const PasswordInput = ({ type, variant, className, id, label, onClick, children, ...restProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<PiEyeClosed />);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setIcon(showPassword ? <PiEyeClosed /> : <PiEye />);
  };

  return (
    <PasswordContainer>
      <PasswordComponent
        type={showPassword ? 'text' : 'password'}
        $variant={variant}
        className={className ? `text-input ${className}` : 'text-input'}
        id={id}
        onClick={onClick}
        placeholder=" "
        {...restProps}
      />
      <Label>{label}</Label>
      <EyeShowPassword type="button" onClick={togglePasswordVisibility}>
        {icon}
      </EyeShowPassword>
    </PasswordContainer>
  );
};

export default PasswordInput;