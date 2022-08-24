import React, { useEffect, useContext, useState } from "react"
import { AppState } from "../../providers/AppProvider.jsx"

function DivisionTeams({ division }) {
  const appState = useContext(AppState)

  const [teams, setTeams] = useState(
    appState.teams.length === 30
      ? appState.teams.filter(team => team.division === division)
      : Array.from({ length: 5 })
  )

  useEffect(() => {
    if (appState.teams.length === 30)
      setTimeout(() => setTeams(appState.teams.filter(team => team.division === division)), 1000)
  }, [appState.teams])

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light">{division}</h4>
      <ul className="list-group list-group-flush">
        {teams.map((team, index) => (
          <li key={index} className="list-group-item hstack gap-4">
            <div className="col-2 align-self-stretch">
              {team && (
                <img src={team.logo} alt={`A logo of ${team.full_name}`} className="img-fluid" />
              )}
              {!team && (
                <span
                  className="placeholder-wave placeholder col-12 rounded-3"
                  style={{ height: "100%" }}
                ></span>
              )}
            </div>
            <h5 className="mb-0 flex-grow-1 py-3">
              {team && team.full_name}
              {!team && <span className="placeholder-wave placeholder col-12"></span>}
            </h5>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DivisionTeams
