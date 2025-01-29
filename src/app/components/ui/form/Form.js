import React from 'react';
import styled from 'styled-components';

const FormElement = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    .logo {
        width: 150px;
    }
`;

function Form({ children, onSubmit, variant }, ref) {
    return (
        <FormElement ref={ref} onSubmit={onSubmit} $variant={variant}>
            {children}
        </FormElement>
    );
}

export default React.forwardRef(Form);