import React from 'react';
import './App.css';
import styled from "styled-components";
import { AccountBox } from './accountBox';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from "./ebconfig.js";
import NutritionT from "./nutrition.js"

const AppContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


function App() {
  return (
      <NutritionT />
  );
}

export default App;
