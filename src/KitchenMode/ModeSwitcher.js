import styled from "styled-components";
import {Flex, Text} from "rebass";
import {Button} from "antd";
import React from "react";

const ModeSwitcherContainer = styled(Flex)`
  padding: ${props => props.theme.space[1]}px;
  border: 1px solid ${props => props.theme.colors.dark};
  justify-content: flex-end;
`;

const ModeSwitcher = ({buttonText, onChangeMode, ...props}) => (
    <ModeSwitcherContainer {...props}>
        <Flex pr={5} alignItems="center">
            <Text fontSize={1} mr={2}>Switch to mode:</Text>
            <Button type="primary" onClick={onChangeMode}>{buttonText}</Button>
        </Flex>
    </ModeSwitcherContainer>
);

export default ModeSwitcher;