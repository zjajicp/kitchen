import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { theme } from './theme';
import {ThemeProvider} from "styled-components";
import KitchenContainer from "./KitchenContainer";
import kitchenStore from './kitchenStore';
import {StoreProvider} from "./react-statex";

const store = {
    kitchen: kitchenStore
};

function App() {
  return (
    <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
            <KitchenContainer/>
        </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
