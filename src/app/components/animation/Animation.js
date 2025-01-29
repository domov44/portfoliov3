// AnimationComponent.js

import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

const StyledAnimation = styled(Lottie)`
    position: ${props => props.$position || ""};
    top: ${props => props.$top || ""};
    left: ${props => props.$left || ""};
    z-index: 10;
    transform: ${props => props.$transform || ""};
    width: ${props => props.$width || ""};
    height: ${props => props.$height || ""};
`;

function AnimationComponent({ animationData, loop, autoplay, position, width, height, transform, top, left, right, bottom }) {
    return (
        <StyledAnimation
            $width={width}
            $height={height}
            $transform={transform}
            $top={top}
            $right={right}
            $left={left}
            $bottom={bottom}
            $position={position}
            animationData={animationData}
            loop={loop ?? true}
            autoplay={autoplay ?? true}
        />
    );
}


export default AnimationComponent;
