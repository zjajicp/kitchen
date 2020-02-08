import styled from "styled-components";
import {Box, Flex, Text} from "rebass";
import {Button, Icon, Input} from "antd";
import React from "react";

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
  text-align: center;
`;

const KitchenManager = ({name, onChange, formData = {}, disableQtyChange, ...props}) => {
    const changeQtyHandler = (step) => () => {
        onChange({
            qty: (formData.qty || 0) + step
        });
    };

    return (
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
                    <Flex alignItems="center" width="50px">
                        <QtyButton
                            disabled={disableQtyChange || !formData.qty}
                            onClick={changeQtyHandler(-1)}
                            type="primary">
                            <Icon type="minus" />
                        </QtyButton>
                        <QtyInput readOnly value={formData.qty} />
                        <QtyButton
                            disabled={disableQtyChange}
                            onClick={changeQtyHandler(+1)}
                            type="primary">
                            <Icon type="plus" />
                        </QtyButton>
                    </Flex>
                </Flex>
            </Box>
        </KitchenManagerContainer>);
};

export default KitchenManager;