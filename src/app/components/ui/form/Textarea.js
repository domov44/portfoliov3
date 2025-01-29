import React from 'react';
import styled from 'styled-components';

const TextInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.textarea`
background: var(--secondary-bg-color);
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
min-height: 150px;
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
      ? 'var(--color-title)'
      : props.$variant === 'green'
        ? 'var(--main-color)'
        : props.$variant === 'white'
          ? 'var(--bg-color)'
          : 'var(--paragraph)'};
  padding: 10px 14px 45px 14px;
  font-size: 20px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:focus {
    border-color: var(--main-color);
    outline: none;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    color: var(--main-color);
    transform: translateY(-13px);
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
  position: absolute;
  top: 5px;
  left: 9px;
  padding: 0px 5px;
  font-size: 20px;
  color: var(--color-title);
  pointer-events: none;
  transition: 0.2s ease-in-out;
  opacity: 0.7;
`;

const Counter = styled.span`
line-height: 1;
padding: 15px;
background: var(--nav-bg-hover);
border-radius: 50px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 8px;
  font-size: 20px;
  color: var(--color-title);
  pointer-events: none;
  transition: 0.2s ease-in-out;
`;

const Textarea = ({ label, variant, className, id, onClick, maxCharCount: propMaxCharCount, onChange, value, ...restProps }) => {
  const [charCount, setCharCount] = React.useState(value ? value.length : 0);
  const [isLimitReached, setIsLimitReached] = React.useState(false);
  const maxCharCount = propMaxCharCount || 250;

  React.useEffect(() => {
    // Mettre à jour le compteur de caractères lors du chargement initial
    if (value) {
      setCharCount(value.length);
      if (value.length >= maxCharCount) {
        setIsLimitReached(true);
      }
    }
  }, [value, maxCharCount]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCharCount(inputValue.length);
    onChange && onChange(event);

    if (inputValue.length < maxCharCount) {
      setIsLimitReached(false);
    } else if (inputValue.length === maxCharCount) {
      setIsLimitReached(true);
    }
  };

  return (
    <>
      <TextInputContainer>
        <Input
          $variant={variant}
          className={className}
          id={id}
          onClick={onClick}
          placeholder=" "
          onChange={handleInputChange}
          maxLength={maxCharCount}
          value={value}
          {...restProps}
        />
        <Label>{label}</Label>
        <Counter style={{ color: isLimitReached ? 'var(--error-color)' : 'var(--color-title)', background: isLimitReached ? 'var(--error-bg)' : 'var(--nav-bg-hover)' }}>
          {charCount} / {maxCharCount}
        </Counter>
      </TextInputContainer>
      {isLimitReached && <p style={{ color: 'var(--error-color)', fontSize: '16px' }}>Limite de caractère atteinte</p>}
    </>
  );
};

export default Textarea;