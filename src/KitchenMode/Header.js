import styled from "styled-components";
import {Box} from "rebass";
import React from "react";

const StyledHeaderContainer = styled(Box)`
  padding: ${props => props.theme.space[2]}px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.dark};
  h1 {
  margin: 0;
  }
`;

const Header = ({ children, ...props }) => (
    <StyledHeaderContainer {...props}>
        <h1>{children}</h1>
    </StyledHeaderContainer>
);

export default Header;