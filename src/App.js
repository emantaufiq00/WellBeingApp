
import './App.css';
import styled from "styled-components";
import { AccountBox } from './accountBox';

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
  return <AppContainer>
    <AccountBox />
  </AppContainer>
}

export default App;
