import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppState } from "../../providers/AppProvider.jsx"
import StandingsProvider from "../../providers/StandingsProvider.jsx"
import GamesProvider from "../../providers/GamesProvider.jsx"
import Page from "../Page.jsx"
import TeamHeader from "./TeamHeader.jsx"
import TeamIntro from "./TeamIntro.jsx"
import TeamSummary from "./TeamSummary.jsx"
import TeamStandings from "./TeamStandings.jsx"
import TeamHistory from "./TeamHistory.jsx"
import TeamStats from "./TeamStats.jsx"
import GameCard from "../GameCard.jsx"
import TeamSchedule from "./TeamSchedule.jsx"

function TeamProfile() {
  const appState = useContext(AppState)

  const { id } = useParams()

  const [team, setTeam] = useState()

  useEffect(() => {
    if (appState.teams.length > 1) {
      setTeam(appState.teams.find(team => team.id == id))
    }
  }, [appState.teams, id])

  return team ? (
    <StandingsProvider>
      <TeamHeader team={team} />
      <Page title={team.name}>
        <div className="row gy-4 gx-5 px-4 px-sm-0 py-4 py-lg-5">
          <article className="d-lg-none">
            <TeamIntro team={team} />
          </article>
          <aside className="order-lg-2 col-lg-6 col-xl-4 vstack gap-5">
            <TeamSummary team={team} />
            <TeamStandings team={team} />
            <TeamHistory team={team} />
            <TeamStats team={team} />
          </aside>
          <main className="col-lg-6 col-xl-8">
            <article className="d-none d-lg-block">
              <TeamIntro team={team} />
            </article>
            <h2 className="text-center mt-3 mt-lg-5">Fixtures & Results</h2>
            <GamesProvider>
              <div className="row">
                <div>
                  <h3 className="text-center">Previous Game</h3>
                  <GameCard filter="previous" />
                </div>
                <div>
                  <h3 className="text-center">Next Game</h3>
                  <GameCard filter="next" />
                </div>
              </div>
              <TeamSchedule team={team} />
            </GamesProvider>
          </main>
        </div>
      </Page>
    </StandingsProvider>
  ) : (
    <Page title="Welcome!">
      <div className="text-center mt-5">
        <div
          className="spinner-grow text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Page>
  )
}

export default TeamProfile
