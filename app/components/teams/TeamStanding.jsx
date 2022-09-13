import React, { useContext } from "react"
import { TeamState } from "../../providers/TeamProvider.jsx"

function TeamStanding() {
  const teamState = useContext(TeamState)

  return (
    <tr>
      <td>{teamState.team.full_name}</td>
    </tr>
  )
}

export default TeamStanding
