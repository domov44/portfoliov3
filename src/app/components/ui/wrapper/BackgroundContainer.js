// Import des dépendances nécessaires
import React from 'react';
import styled from 'styled-components';

// Définition du composant stylisé
const BackgroundImageContainerDiv = styled.div`
    width: 100%;
    color: rgb(255, 255, 255);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
    position: relative;
    border-radius: 16px;
    z-index: 0;
    margin-bottom: 24px;
    height: 290px;
    background: linear-gradient(rgb(49 81 76 / 80%), rgb(21 22 22 / 80%)),
        url(${props => props.$coverUrl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

// Définition du composant fonctionnel
function BackgroundContainer({ children, coverUrl }) {
    return (
        <BackgroundImageContainerDiv $coverUrl={coverUrl}>
            {children}
        </BackgroundImageContainerDiv>
    );
}

// Export du composant
export default BackgroundContainer;