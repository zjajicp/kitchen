import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { theme } from './theme';
import {ThemeProvider} from "styled-components";
import KitchenWork from "./KitchenWork";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <KitchenWork/>
    </ThemeProvider>
  );
}

export default App;
