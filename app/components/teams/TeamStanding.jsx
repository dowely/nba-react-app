import React, { useState, useContext } from "react"

function TeamStanding({ standingTeam, eighth, highlighted }) {
  return (
    <tr
      className={
        (eighth ? "border-bottom border-secondary border-2 " : "") +
        (highlighted ? "table-primary" : "")
      }
      style={{ "--bs-border-style": "dashed" }}
    >
      <td className="ps-3">{standingTeam.full_name}</td>
      <td className="text-center">{standingTeam.standing.winsLosses[0]}</td>
      <td className="text-center">{standingTeam.standing.winsLosses[1]}</td>
      <td className="pe-2 text-center">{standingTeam.standing.pct.toString().substring(1)}</td>
    </tr>
  )
}

export default TeamStanding
