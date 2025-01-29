import React from 'react';
import styled from 'styled-components';

const BentoDiv = styled.div`
  position: ${props => props.$position || "relative"};
  overflow: hidden;
  gap: 10px;
  top: ${props => props.$top || ""};
  right: ${props => props.$right || ""};
  bottom: ${props => props.$bottom || ""};
  left: ${props => props.$left || ""};
  display: flex;
  flex-direction: ${props => (props.$direction === "row" ? "row" : "column")};
  justify-content: center;
  align-items: ${props => (props.$align === "center" ? "center" : "")};
  width: ${props => (props.$width ? props.$width : "100%")};
  height: ${props => (props.$height ? props.$height : "")};
  background: ${props => (props.$highlight ? "#1f1d27" : "")};
  padding: ${props => (props.$padding ? props.$padding : "24px")};
  border-radius: ${props => (props.$highlight ? "10px" : "")};
  border: 2px solid #2b2930;

  @media (max-width: 1000px) {
    width: ${props => (props.$responsive && props.$responsive.tabletWidth ? props.$responsive.tabletWidth : props.$width)};
    padding: ${props => (props.$responsive && props.$responsive.tabletPadding ? props.$responsive.tabletPadding : props.$padding)};
  }

  @media (max-width: 750px) {
    width: ${props => (props.$responsive && props.$responsive.mobileWidth ? props.$responsive.mobileWidth : props.$responsive && props.$responsive.tabletWidth ? props.$responsive.tabletWidth : props.$width)};
    padding: ${props => (props.$responsive && props.$responsive.mobilePadding ? props.$responsive.mobilePadding : props.$responsive && props.$responsive.tabletPadding ? props.$responsive.tabletPadding : props.$padding)};
  }
`;

function Bento({ children, align, position, direction, highlight, top, right, bottom, left, width, padding, responsive, height }) {
  return (
    <BentoDiv
      $align={align}
      $position={position}
      $top={top}
      $right={right}
      $bottom={bottom}
      $left={left}
      $direction={direction}
      $highlight={highlight}
      $width={width}
      $height={height}
      $padding={padding}
      $responsive={responsive}
    >
      {children}
    </BentoDiv>
  );
}

export default Bento;