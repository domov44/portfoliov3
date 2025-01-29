import React from "react";
import styled from "styled-components";

const TrComponent = styled.tr`
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
`;

const Tr = ({ size, className, id, onClick, children, ...restProps }) => {
  return (
    <TrComponent size={size} {...restProps}>
      {children}
    </TrComponent>
  );
};

export default Tr;