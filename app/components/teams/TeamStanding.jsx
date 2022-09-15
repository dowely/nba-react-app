import React, { useState, useContext } from "react"

function TeamStanding({ standingTeam }) {
  return (
    <tr>
      <td className="ps-3">{standingTeam.full_name}</td>
      <td>{standingTeam.standing.winsLosses[0]}</td>
      <td>{standingTeam.standing.winsLosses[1]}</td>
      <td>{standingTeam.standing.pct.toString().substring(1)}</td>
    </tr>
  )
}

export default TeamStanding
