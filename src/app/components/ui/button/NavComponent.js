import React, { useState } from "react";
import styled, { css } from "styled-components";
import Link from 'next/link';
import { useRouter } from 'next/router';

const commonStyles = css`
  line-height: 0;
  width: 100%;
  padding: 12px 18px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
`;

const classicStyles = css`
  color: var(--paragraph);
  &:hover {
    color: var(--color-title);
    background-color: var(--nav-bg-hover);
  }
`;

const dangerStyles = css`
  color: var(--error-color);
  &:hover {
    background-color: var(--error-bg);
  }
`;

const activeStyles = css`
  color: var(--color-title);
  background-color: var(--nav-bg-hover);
`;

const StyledComponent = styled.a`
  ${(props) => (props.$variant === 'danger' ? dangerStyles : classicStyles)}
  ${(props) => props.$active && activeStyles}
  ${commonStyles}

  border: none;
  list-style: none;
  font-size: 20px;
  display: flex;
  overflow: hidden;
`;

const StyledNotifications = styled.span`
    width: 30px;
    height: 30px;
    color: var(--error-color);
    background: var(--error-bg);
    line-height: 1;
    position: absolute;
    right: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 16px;
    border-radius: 50px;
`;

const NavComponent = ({ children, onClick, icon: Icon, variant, href, Notification: Notification }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const Component = href ? Link : 'a';

  return (
    <StyledComponent
      as={Component}
      href={href}
      onClick={handleClick}
      $variant={variant}
      $active={isActive}
    >
      {Icon && <Icon />} {Notification && <StyledNotifications>1</StyledNotifications>} {children}
    </StyledComponent>
  );
};

export default NavComponent;
