import React from 'react';
import { PiCameraLight } from 'react-icons/pi';
import styled from "styled-components";

export default function TextHover({ children, onClick }) {
  return (
    <ContainerClickable onClick={onClick}>
      {children}
      <OverlayText>
        <PiCameraLight />
      </OverlayText>
    </ContainerClickable>
  )
}

const OverlayText = styled.div`
    position: absolute;
    text-align: center;
    font-size: 30px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    opacity: 0.8;

    &:hover {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;

const ContainerClickable = styled.div`
    position: relative;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
