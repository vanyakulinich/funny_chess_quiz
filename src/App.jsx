import React from "react";
import { ThemeProvider } from "styled-components";
import GameContainer from "./containers/GameContainer";
import { GlobalGameStyles, gameTheme } from "./styles/gameTheme";
import GameContextProvider from "./providers/gameProvider";

const App = () => (
  <ThemeProvider theme={gameTheme}>
    <GameContextProvider>
      <GameContainer />
    </GameContextProvider>
    <GlobalGameStyles />
  </ThemeProvider>
);

export default App;
