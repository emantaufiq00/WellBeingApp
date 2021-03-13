
import './App.css';
import styled from "styled-components";
import { AccountBox } from './accountBox';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from "./ebconfig.js";

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
      <EasybaseProvider ebconfig={ebconfig}>
      <AppContainer>
        <AccountBox />
      </AppContainer>
      </EasybaseProvider>
  );
}

export default App;
