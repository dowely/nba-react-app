import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import GamesProvider from "../../providers/GamesProvider.jsx"

//components
import Page from "../Page.jsx"
import GamesForm from "./GamesForm.jsx"
import GamesResults from "./GamesResults.jsx"

function Games() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [rivalry, setRivalry] = useState(false)

  return (
    <GamesProvider>
      <Page title="Games">
        <GamesForm params={searchParams} setParams={setSearchParams} setRivalry={setRivalry} />
        <GamesResults params={searchParams} setParams={setSearchParams} rivalry={rivalry} />
      </Page>
    </GamesProvider>
  )
}

export default Games
