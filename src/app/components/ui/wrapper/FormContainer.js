import React from 'react';
import styled from 'styled-components';

const FormContainerDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 80px);
`;

function FormContainer({ children }) {
    return (
        <FormContainerDiv>
            {children}
        </FormContainerDiv>
    );
}

export default FormContainer;