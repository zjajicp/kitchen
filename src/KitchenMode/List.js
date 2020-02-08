import {Box, Flex, Text} from "rebass";
import React from "react";
import styled from "styled-components";
import {Alert, Button, Checkbox} from "antd";

const StyledListContainer = styled(Box)`
      border: 1px solid #000;
        padding: 8px 16px;
        min-height: 350px;
        max-height: 350px;
`;

const List = ({ firstEmpty, title, children, ...props }) => (
    <StyledListContainer {...props}>
        <Text textAlign="center" fontWeight="bold" mb={3}>
            {title}
        </Text>

        <Flex mb={2} justifyContent="space-between">
            {firstEmpty ? <Box width={1 / 4}></Box> : ""}
            <Text textAlign="center" fontSize={2} fontWeight="bold" width={1/2}>
                Item Name
            </Text>
            <Text
                fontSize={2}
                fontWeight="bold"
                textAlign="right"
                width={firstEmpty ? 1 / 4 : 1/2}
            >
                Qty
            </Text>
        </Flex>
        {children}
    </StyledListContainer>
);

const StyledListItemsContainer = styled(Box)`
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 4px;
`;

export const ItemsList = ({items = [], title, ...props}) => (
    <List title={title} {...props}>
        <StyledListItemsContainer height="250px">
            {items.map(item => (
                <Flex key={item.name} justifyContent="space-between" alignItems="center">
                    <Text width={1 / 2} textAlign="center" fontSize={1}>
                        {item.name}
                    </Text>
                    <Text width={1 / 2} textAlign="right" fontSize={1}>
                        {item.qty}
                    </Text>
                </Flex>
            ))}
        </StyledListItemsContainer>
    </List>
);

const Error = styled(Text)`
   color: ${props => props.theme.colors.error};
`;

export const InteractiveItemsList = ({items = [], title, onSelect, onConfirm, confirmText, confirmDisabled, ...props}) => (
    <List title={title} {...props} firstEmpty>
        <StyledListItemsContainer height="220px">
            {items.map(item => (
                <>
                    <Flex key={item.name}>
                        <Box width={1/4}>
                            <Checkbox disabled={item.disabled} onChange={() => {
                                onSelect(item);
                            }} checked={item.checked} />
                        </Box>
                        <Text textAlign="center" fontSize={1} width={1/2}>{item.name}</Text>
                        <Text textAlign="right" fontSize={1} width={1/4}>{item.qty}</Text>
                    </Flex>
                    {item.error && <Error mt={1} mb={2} fontSize={0}>{item.error.message}</Error> }
                </>
            ))}
        </StyledListItemsContainer>
        <Button disabled={confirmDisabled} block type="primary" onClick={onConfirm}>{confirmText}</Button>
    </List>
);