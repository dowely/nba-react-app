import React, { useContext } from "react"
import { TeamState } from "../../providers/TeamProvider.jsx"

function TeamHeader() {
  const teamState = useContext(TeamState)

  return <h1>This is a {teamState.team.full_name} profile page.</h1>
}

export default TeamHeader
