import React from "react"
import { useSearchParams } from "react-router-dom"
import GamesProvider from "../../providers/GamesProvider.jsx"

//components
import Page from "../Page.jsx"
import GamesForm from "./GamesForm.jsx"
import GamesList from "./GamesList.jsx"

function Games() {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <GamesProvider>
      <Page title="Games">
        <GamesForm params={searchParams} setParams={setSearchParams} />
        <GamesList noParams={Boolean(!Array.from(searchParams.keys()).length)} />
      </Page>
    </GamesProvider>
  )
}

export default Games
