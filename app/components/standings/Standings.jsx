import React, { useState } from "react"
import StandingsProvider from "../../providers/StandingsProvider.jsx"
import Page from "../Page.jsx"
import StandingsFilters from "./StandingsFilters.jsx"
import StandingsTable from "./StandingsTable.jsx"

function Standings() {
  const [filter, setFilter] = useState()
  const [season, setSeason] = useState()

  return (
    <StandingsProvider>
      <Page title="Standings">
        <div className="card mt-4">
          <StandingsFilters filter={filter} setFilter={setFilter} setSeason={setSeason} />
          <StandingsTable filter={filter} season={season} />
        </div>
      </Page>
    </StandingsProvider>
  )
}

export default Standings
