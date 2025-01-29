import React from 'react';
import styled from 'styled-components';

// Define the styles for the overlay
const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:black; 
  opacity: 0.7;
  z-index: 1000; 
`;

function Overlay({onClick}) {
  return <OverlayWrapper onClick={onClick}/>;
}

export default Overlay;