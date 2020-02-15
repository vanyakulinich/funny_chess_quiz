import React from "react";
import { ThemeProvider } from "styled-components";
import GameContainer from "./containers/GameContainer";
import { GlobalGameStyles, gameTheme } from "./styles/gameTheme";

const App = () => (
  <ThemeProvider theme={gameTheme}>
    <GameContainer />
    <GlobalGameStyles />
  </ThemeProvider>
);

export default App;
