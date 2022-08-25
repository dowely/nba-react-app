import React, { useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AppState } from "../../providers/AppProvider.jsx"
import Page from "../Page.jsx"

function TeamProfile() {
  const appState = useContext(AppState)
  const { id } = useParams()

  const [team, setTeam] = useState(appState.teams.find(team => team.id == id))

  return (
    <Page title={team && team.name}>
      <h1>This is a {team && team.full_name} profile page.</h1>
      <Link to="/teams/23">23</Link>
    </Page>
  )
}

export default TeamProfile
