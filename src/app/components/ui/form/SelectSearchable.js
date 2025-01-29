import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Text from '../textual/Text';

const StyledSelect = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectInput = styled.input`
  width: 100%;
  color: var(--paragraph);
  padding: 10px;
  border: 1px solid var(--paragraph);
  background-color: var(--secondary-bg-color);
  text-align: left;
  border-radius: 5px;
  font-size: 20px;

  &:focus {
    border-color: var(--main-color);
    color: var(--main-color);
    outline: none;
  }

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
  &.empty {
    position: absolute;
    left: 9px;
    padding: 0px 5px;
    font-size: 16px;
    color: var(--color-title);
    pointer-events: none;
    transition: 0.2s ease-in-out;
    opacity: 0.7;
  }

  &.notempty {
    position: absolute;
    left: 9px;
    padding: 0px 5px;
    color: var(--main-color);
    transform: translateY(-22px);
    font-size: 0.75rem;
    font-weight: 600;
    background-color: var(--secondary-bg-color);
    opacity: 1;
  }
`;

const OptionList = styled.ul`
  margin-top: 0px;
  max-height: 230px;
  overflow-y: scroll;
  z-index: 1;
  background: var(--bg-color);
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  z-index: 2;
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

const SelectSearchable = ({ options, onSelect, defaultText, value, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  useEffect(() => {
    const selected = options.find(option => option.id === value);
    setSelectedOption(selected || null);
    setSearchTerm(selected ? selected.name : '');
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        const matchedOption = options.find(option => option.name.toLowerCase() === searchTerm.toLowerCase());
        if (!matchedOption && searchTerm.trim() !== '') {
          setSearchTerm('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchTerm, options]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  const handleSearchChange = (event) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    const matchedOption = options.find(option => option.name.toLowerCase() === inputText.toLowerCase());
    if (matchedOption) {
      setSelectedOption(matchedOption);
      onSelect(matchedOption);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledSelect ref={selectRef}>
      <SelectInput
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
      />
      <Label className={searchTerm === '' ? 'empty' : 'notempty'}>{label}</Label>
      <OptionList $isOpen={isOpen}>
        {filteredOptions.length === 0 ? (
          <Text>Aucun résultat trouvé pour &quot;{searchTerm}&quot;</Text>
        ) : (
          filteredOptions.map((option) => (
            <OptionItem key={option.id} onClick={() => handleOptionClick(option)}>
              {option.name}
              {option.icon && <img src={option.icon} alt={option.name} />}
            </OptionItem>
          ))
        )}
      </OptionList>
    </StyledSelect>
  );
};



export default SelectSearchable;
