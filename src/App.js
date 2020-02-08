import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { theme } from './theme';
import {ThemeProvider} from "styled-components";
import KitchenWork from "./KitchenWork";
import kitchenStore from './kitchenStore';
import {StoreProvider} from "react-statex";

const store = {
    kitchen: kitchenStore
};

function App() {
  return (
    <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
            <KitchenWork/>
        </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
