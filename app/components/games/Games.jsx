import React from "react"
import GamesProvider from "../../providers/GamesProvider.jsx"

//components
import Page from "../Page.jsx"
import GamesForm from "./GamesForm.jsx"
import GamesList from "./GamesList.jsx"

function Games() {
  return (
    <GamesProvider>
      <Page title="Games">
        <GamesForm />
        <GamesList />
      </Page>
    </GamesProvider>
  )
}

export default Games
