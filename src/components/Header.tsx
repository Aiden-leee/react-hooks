import React from "react";
import Search from "./Search";
import styled from "styled-components";

const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #233250;
  padding: 20px;
`;
const H2tag = styled.h2`
  color: #fff;
`;

interface HeaderProps {
  text: string;
  search: any;
}

const Header: React.FC<HeaderProps> = ({ text, search }) => {
  return (
    <HeaderBlock className="app-header">
      <H2tag>{text}</H2tag>
      <Search search={search} />
    </HeaderBlock>
  );
};

export default Header;
