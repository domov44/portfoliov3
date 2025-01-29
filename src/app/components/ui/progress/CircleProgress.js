import React from 'react';
import styled from 'styled-components';

function CircleProgress({ progress, label = 'Progress Bar', width = '100%' }) {
  const strokeWidth = 6;
  const radius = (100 / 2) - (strokeWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress < 40) {
      return 'var(--error-color)';
    } else if (progress >= 40 && progress < 75) {
      return 'var(--warning-color)';
    } else {
      return 'var(--success-color)';
    }
  };

  return (
    <Container>
      <svg
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        height={width}
        role="progressbar"
        width={width}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
        />

        <FilledCircle
          cx="50"
          cy="50"
          data-testid="progress-bar-bar"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          color={getColor()}
        />
      </svg>

      <Text data-testid="progress-bar-text" color={getColor()}>
        {progress}%
      </Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Circle = styled.circle`
  fill: var(--secondary-bg-color);
  stroke: var(--bg-color);
  stroke-linecap: round;
`;

const FilledCircle = styled(Circle)`
  stroke: ${(props) => props.color};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease-out;
`;

const Text = styled.div`
  line-height: 1;
  align-items: center;
  color: ${(props) => props.color};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  letter-spacing: 0.025em;
  margin-bottom: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export default CircleProgress;