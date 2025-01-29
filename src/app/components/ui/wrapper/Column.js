import React from 'react';
import styled from 'styled-components';

const ColumnDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.$justify === "center" ? "center" : "")};
  align-items: ${props => (props.$align === "center" ? "center" : "")};
  width: ${props => props.$width || "50%"};
  gap: ${props => props.$gap || ""};

  @media (max-width: 1000px) {
    width:100%;
    }

`;

function Column({ width, gap, children, align, justify }) {
  return (
    <ColumnDiv $width={width} $gap={gap} $align={align} $justify={justify}>
      {children}
    </ColumnDiv>
  );
}

export default Column;