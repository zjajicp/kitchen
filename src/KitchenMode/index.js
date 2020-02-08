import React from 'react';
import {Box, Flex} from 'rebass';
import {InteractiveItemsList, ItemsList} from "./List";
import KitchenManager from "./KitchenManager";
import ModeSwitcher from "./ModeSwitcher";
import Header from "./Header";


const Index = ({
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
                         disableQtyChange,
                         onInteractiveListSelect,
                         interactiveListConfirmDisabled,
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
                        confirmDisabled={interactiveListConfirmDisabled}
                        onSelect={onInteractiveListSelect}
                        onConfirm={onInteractiveListConfirm}
                        confirmText={interactiveListConfirmText}
                        items={interactiveItems}
                        title={interactiveListTitle}
                        width={0.45}/>
                    <ItemsList
                        items={items}
                        title={listTitle}
                        width={0.45} />
                </Flex>
                <KitchenManager
                    disableQtyChange={disableQtyChange}
                    onChange={onFormChange}
                    formData={formData}
                    name={manageText} mb={4}
                />
                <ModeSwitcher onChangeMode={onChangeMode} buttonText={changeModeText}  />
            </Box>
        </Box>
    );
};

export default Index;
