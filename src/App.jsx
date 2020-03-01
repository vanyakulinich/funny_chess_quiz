import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'

import GameContainer from './containers/GameContainer'
import { GlobalGameStyles, gameTheme } from './styles/gameTheme'
import GameContextProvider from './providers/gameProvider'

const App = () => (
  <>
    <Helmet>
      <title>Chess Quiz</title>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet"></link>
      <meta name="description" content="Chess quiz about replacing positions of white and black horses" />
    </Helmet>
    <ThemeProvider theme={gameTheme}>
      <GameContextProvider>
        <GameContainer />
      </GameContextProvider>
      <GlobalGameStyles />
    </ThemeProvider>
  </>
)

export default App
