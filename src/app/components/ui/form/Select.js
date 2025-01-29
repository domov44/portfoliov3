// Select.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  position: relative;
`;

const SelectButton = styled.button`
  width: 100%;
  color: var(--paragraph);
  padding: 10px;
  border: 1px solid var(--color-title);
  background-color: var(--secondary-bg-color);
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
`;

const OptionList = styled.ul`
margin-top: 10px;
  z-index: 1;
  background: var(--bg-color);
  position: absolute;
  top: 100%;
  left: 0;
  width: auto;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;

const OptionItem = styled.li`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: var(--paragraph);
  transition: .3s ease-in-out;
  &:hover {
    color: var(--color-title);
    background-color: var(--secondary-bg-color);
  }
`;

const Select = ({ options, onSelect, defaultText, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const selected = options.find(option => option.id === value);
        setSelectedOption(selected || null);
    }, [value, options]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledSelect>
            <SelectButton type="button" onClick={toggleDropdown}>
                {selectedOption ? (
                    <>
                        {selectedOption.label}
                        {selectedOption.icon && <img src={selectedOption.icon} alt={selectedOption.label} />}
                    </>
                ) : (
                    value ? (
                        value
                    ) : (
                        defaultText || 'Sélectionner...'
                    )
                )}
            </SelectButton>
            <OptionList $isOpen={isOpen}>
                {options.map((option) => (
                    <OptionItem key={option.id} onClick={() => handleOptionClick(option)}>
                        {option.label}
                        {option.icon && <img src={option.icon} alt={option.label} />}
                    </OptionItem>
                ))}
            </OptionList>
        </StyledSelect>
    );
};

export default Select;