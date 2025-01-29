import React from "react";
import styled from "styled-components";

const TipsComponent = styled.span`
line-height: 1;
border-radius: 5px;
border-left: solid 5px;
gap:5px;
  position: relative;
  display: flex;
  align-items: center;
    color: ${props =>
        props.$variant === "primary"
            ? "var(--colored-text)"
            : props.$variant === "secondary"
                ? "var(--color-title)"
                : props.$variant === "success"
                    ? "var(--success-color)"
                    : props.$variant === "danger"
                        ? "var(--error-color)"
                        : props.$variant === "warning"
                            ? "var(--warning-color)"
                            : "var(--color-title)"};
  background: ${props =>
        props.$variant === "primary"
            ? "var(--nav-bg-hover)"
            : props.$variant === "secondary"
                ? "var(--secondary-color)"
                : props.$variant === "success"
                    ? "var(--success-bg)"
                    : props.$variant === "danger"
                        ? "var(--error-bg)"
                        : props.$variant === "warning"
                            ? "var(--warning-bg)"
                            : "var(--color-title)"};
  padding: 10px 14px;
  font-size: ${(props) => {
        switch (props["size"]) {
            case "sm":
                return "16px";
            case "md":
                return "18px";
            case "lg":
                return "20px";
            default:
                return "18px";
        }
    }};
  margin: 10px 0;
`;


const Tips = ({ variant, className, id, children, ...restProps }) => {
    return (
        <TipsComponent
            $variant={variant}
            {...restProps}
            className={className ? `tips ${className}` : "tips"}
            id={id}
        >
            {children}
        </TipsComponent>

    );
};

export default Tips;