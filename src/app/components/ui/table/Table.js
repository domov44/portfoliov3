import React from "react";
import styled from "styled-components";

const TableComponent = styled.table`
border-spacing: 0px;
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
  width: 100%;
 overflow-x: auto;
 --table-cell-padding: var(--cell-padding-block,0.3rem) var(--cell-padding-inline,0.55rem);
 --table-border-radius: 0.375rem;
`;

const Table = ({ size, className, id, onClick, children, ...restProps }) => {
    return (
        <TableComponent size={size} {...restProps}>
            {children}
        </TableComponent>
    );
};

export default Table;
