import React, { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
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
import TeamFixtures from "./TeamFixtures.jsx"
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

  return parseInt(id) >= 1 && parseInt(id) <= 30 ? (
    team ? (
      <StandingsProvider>
        <TeamHeader team={team} />
        <Page title={team.name}>
          <div className="row gy-4 gx-lg-5 px-4 px-sm-0 pt-4 pt-lg-5">
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
              <GamesProvider>
                <TeamFixtures team={team} />
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
  ) : (
    <Navigate to="/" />
  )
}

export default TeamProfile
