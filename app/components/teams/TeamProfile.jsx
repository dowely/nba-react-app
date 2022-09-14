import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import useGames from "../../hooks/useGames"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import TeamProvider from "../../providers/TeamProvider.jsx"
import Page from "../Page.jsx"
import TeamHeader from "./TeamHeader.jsx"
import TeamIntro from "./TeamIntro.jsx"
import TeamSummary from "./TeamSummary.jsx"
import StandingsProvider from "../../providers/StandingsProvider.jsx"
import TeamStandings from "./TeamStandings.jsx"

function TeamProfile() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const { id } = useParams()

  const [team, setTeam] = useState()

  const [gameRequest, setGameRequest] = useState({
    per_page: 100,
    "team_ids[]": [parseInt(id)],
    "seasons[]": [new Date().getFullYear()]
  })

  const games = useGames(gameRequest, appDispatch)

  useEffect(() => {
    if (games && !games.length)
      setGameRequest(prev => ({
        ...prev,
        "seasons[]": [new Date().getFullYear() - 1]
      }))
  }, [games])

  useEffect(() => {
    if (appState.teams.length > 1) {
      setTeam(appState.teams.find(team => team.id == id))
    }
  }, [appState.teams, id])

  return team ? (
    <StandingsProvider>
      <TeamProvider games={games} team={team}>
        <TeamHeader team={team} />
        <Page title={team.name}>
          <div className="row gy-4 gx-5 px-4 px-sm-0 py-4 py-lg-5">
            <main className="col-lg-6 col-xl-8">
              <TeamIntro />
            </main>
            <aside className="col-lg-6 col-xl-4 vstack gap-4">
              <TeamSummary team={team} />
              <TeamStandings team={team} />
            </aside>
          </div>
        </Page>
      </TeamProvider>
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
