import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Text from '../textual/Text';

const AccordionContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  background: var(--secondary-bg-color);
  position: relative;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          overflow: visible;
        `
      : css`
          overflow: hidden;
        `}
`;

const AccordionHeader = styled.div`
  padding: 10px 20px;
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  &:hover {
    background: var(--nav-bg-hover);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      padding: 20px; /* Augmente le padding du bas lorsque l'accordéon est ouvert */
    `}
`;


const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  line-height: 0;
`;

const AccordionContentWrapper = styled.div`
  transition: height 0.3s ease-in-out;
  ${({ $isOpen, $contentHeight }) =>
    $isOpen
      ? css`
          height: ${$contentHeight}px;
          overflow: visible;
        `
      : css`
          height: 0;
          overflow: hidden;
        `}
`;

const AccordionContent = styled.div`
  padding: 10px 20px;
`;

const Accordion = ({ title, children, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (defaultOpen) {
      setContentHeight('auto');
    }
  }, [defaultOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer $isOpen={isOpen}>
      <AccordionHeader onClick={toggleAccordion} $isOpen={isOpen}>
        <Text>{title}</Text>
        <IconContainer>
          {isOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
        </IconContainer>
      </AccordionHeader>
      <AccordionContentWrapper
        $isOpen={isOpen}
        $contentHeight={contentHeight}
      >
        {isOpen && (
          <AccordionContent
            ref={(content) => {
              if (content) {
                setContentHeight(content.scrollHeight);
              }
            }}
          >
            {children}
          </AccordionContent>
        )}
      </AccordionContentWrapper>
    </AccordionContainer>
  );
};

export default Accordion;
