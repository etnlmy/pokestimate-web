import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import HomePage from './pages/Home/HomePage';
import RoomPage from './pages/Room/RoomPage';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    pokerGreen: {
      50: '#dffef5',
      100: '#bbf3e5',
      200: '#94e9d4',
      300: '#6ce0c3',
      400: '#46d7b2',
      500: '#2dbd98',
      600: '#1f9376',
      700: '#126955',
      800: '#034033',
      900: '#001710',
    },
    pokerBlue: {
      50: '#eaf3fe',
      100: '#ccd9e7',
      200: '#adbfd2',
      300: '#8da6be',
      400: '#6e8cab',
      500: '#557392',
      600: '#415972',
      700: '#2d4052',
      800: '#192633',
      900: '#010e16',
    },
    pokerGray: "#656d78"
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme} className="App">
      <CSSReset />
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/:roomId" exact component={RoomPage}></Route>
    </ThemeProvider >
  );
}

export default App;
