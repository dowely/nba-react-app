import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppState } from "../../providers/AppProvider.jsx"
import TeamProvider from "../../providers/TeamProvider.jsx"
import Page from "../Page.jsx"
import TeamHeader from "./TeamHeader.jsx"

function TeamProfile() {
  const appState = useContext(AppState)

  const { id } = useParams()

  const [team, setTeam] = useState()

  useEffect(() => {
    if (appState.teams.length > 1) {
      setTeam(appState.teams.find(team => team.id == id))
    }
  }, [appState.teams, id])

  return (
    <Page title={team ? team.name : "Welcome!"}>
      {!team && (
        <div className="text-center mt-5">
          <div
            className="spinner-grow text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {team && (
        <TeamProvider team={team}>
          <TeamHeader />
        </TeamProvider>
      )}
    </Page>
  )
}

export default TeamProfile
