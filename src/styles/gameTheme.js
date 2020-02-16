import { createGlobalStyle } from "styled-components";

export const gameTheme = {
  flex: {
    centerAll: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
  },
  color: {
    green: "green",
    blue: "#2727c9f5",
    black: "#000000",
    white: "#ffffff",
    grey: "#b2b2a9db",
    steel: "#35544f"
  },
  horses: {
    white: "#ffffff",
    black: "#000000"
  },
  font: {
    size: {
      s14: "14px",
      s16: "16px",
      s20: "20px"
    },
    weight: {
      w3: "300",
      w9: "900",
      w5: "500",
      w7: "700"
    }
  }
};

export const GlobalGameStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lemonada&display=swap');

* {
    font-family: 'Lemonada', cursive;
    color: ${gameTheme.color.steel}
}
body {
    margin: 0;
    padding: 0;
    background: ${gameTheme.color.grey};
    height: 100vh;
    width: 100vw;
    ${gameTheme.flex.centerAll}
}
`;
