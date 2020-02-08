import React from 'react';
import {Box, Text, Flex} from 'rebass';
import styled from 'styled-components';
import {Button, Checkbox, Input, Icon} from "antd";

const StyledHeaderContainer = styled(Box)`
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #000;
`;

const Header = ({ children, ...props }) => (
    <StyledHeaderContainer {...props}>
        <h2>{children}</h2>
    </StyledHeaderContainer>
);

const StyledListContainer = styled(Box)`
      border: 1px solid #000;
        padding: 8px 16px;
        min-height: 350px;
        max-height: 350px;
        scrollY: auto;
`;

const List = ({title, children, ...props}) => (
    <StyledListContainer {...props}>
        <Text textAlign="center" fontWeight="bold" mb={3}>{title}</Text>

        <Flex mb={2} justifyContent="space-between" pl={2}>
            <Text fontSize={2} fontWeight="bold">Item Name</Text>
            <Text fontSize={2} fontWeight="bold">Qty</Text>
        </Flex>
    </StyledListContainer>
);

const ItemsList = ({items = [], title, ...props}) => (
    <List title={title} {...props}>
        {items.map(item => (
            <Flex key={item.name} justifyContent="space-between" alignItems="center">
                <Text  fontSize={1}>
                    {item.name}
                </Text>
                <Text fontSize={1}>
                    {item.qty}
            </Text>
            </Flex>
        ))}
    </List>
);

const InteractiveItemsList = ({items = [], title, onSelect, onConfirm, confirmText, ...props}) => (
    <List title={title} {...props}>
        {items.map(item => (
            <Flex key={item.name}>
                <Box width={1/4}>
                    <Checkbox onChange={() => {
                        onSelect(item);
                    }} checked={item.checked} />
                </Box>
                <Text fontSize={1} width={1/2}>{item.name}</Text>
                <Text fontSize={1} width={1/4}>{item.qty}</Text>
            </Flex>
        ))}
        <Button type="block" onClick={onConfirm}>{confirmText}</Button>
    </List>
);

const KitchenManagerContainer = styled(Box)`
  border: 1px solid #000;
`;


const QtyButton = styled(Button)`
 &&& {
  border-radius: 0;
 }
`;

const QtyInput = styled(Input)`
  border-radius: 0;
  border-right: 0;
  border-left: 0;
`;

const KitchenManager = ({name, onChange, formData = {}, ...props}) => (
    <KitchenManagerContainer p={3} {...props}>
        <Text textAlign="center" fontSize={3} fontWeight="bold" mb={3}>Add/Remove/Modify {name}</Text>
        <Box px={5}>
            <Flex alignItems="center" mb={3}>
                <Text width={1/4}>Item name:</Text>
                <Box width={0.5}>
                    <Input value={formData.itemName} onChange={evt => {
                        onChange({
                            itemName: evt.target.value
                        })
                    }} />
                </Box>
            </Flex>

            <Flex  alignItems="center" flexDirection="row">
                <Text width={1/4}>Quantity:</Text>
                <Flex alignItems="center" width="200px">
                    <QtyButton type="primary"><Icon type="minus" /></QtyButton>
                    <QtyInput type="number" value={formData.qty} onChange={evt => {
                        onChange({
                            qty: evt.target.value
                        })
                    }} />
                    <QtyButton type="primary"><Icon type="plus" /></QtyButton>
                </Flex>
            </Flex>
        </Box>
    </KitchenManagerContainer>
);

const ModeSwitcherContainer = styled(Flex)`
  padding: 8px;
  border: 1px solid #000;
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





const KitchenMode = ({
                         title,
                         listTitle,
                         interactiveListTitle,
                         manageText,
                         changeModeText,
                         items,
                         interactiveItems,
                         onFormChange,
                         onChangeMode,
                         formData,
                         onInteractiveListConfirm,
                         interactiveListConfirmText,
                         ...props
}) => {
    return (
        <Box css={{
            border: '1px solid #000',
        }} {...props}>
            <Header>{title}</Header>
            <Box p={3}>
                <Flex mb={4} justifyContent="space-between">
                    <InteractiveItemsList
                        onConfirm={onInteractiveListConfirm}
                        confirmText={interactiveListConfirmText}
                        items={interactiveItems}
                        title={interactiveListTitle}
                        width={1/3}/>
                    <ItemsList items={items} title={listTitle} width={1/3} />
                </Flex>
                <KitchenManager onChange={onFormChange} formData={formData} name={manageText} mb={4} />
                <ModeSwitcher onChangeMode={onChangeMode} buttonText={changeModeText}  />
            </Box>
        </Box>
    );
};

export default KitchenMode;
