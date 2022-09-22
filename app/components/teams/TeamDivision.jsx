import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs"

function TeamDivision({ division }) {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const [teams, setTeams] = useState(
    appState.teams.length === 30
      ? appState.teams.filter(team => team.division === division)
      : Array.from({ length: 5 })
  )

  const followed = JSON.parse(appState.followedTeams) || []

  useEffect(() => {
    if (appState.teams.length === 30)
      setTimeout(() => setTeams(appState.teams.filter(team => team.division === division)), 1000)
  }, [appState.teams])

  function toggleFollow(teamId) {
    const teamName = teams.find(team => team.id === teamId).full_name

    appDispatch({ type: "toggleFollow", teamId })

    appDispatch({
      type: "flashMessage",
      msg: {
        text: followed.includes(teamId)
          ? `${teamName} games will no longer be displayed in your feed`
          : `${teamName} games will now populate your feed`,
        color: followed.includes(teamId) ? "danger" : "success"
      }
    })
  }

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light">{division}</h4>
      <ul className="list-group list-group-flush">
        {teams.map((team, index) => (
          <li key={index} className="list-group-item hstack ps-2 ps-sm-3 gap-3 gap-sm-4">
            <div className="col-2 align-self-stretch">
              <div className="d-inline-block align-middle h-100"></div>
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
              {team && (
                <Link className="anchor" to={`/teams/${team.id}`}>
                  {team.full_name}
                </Link>
              )}
              {!team && <span className="placeholder-wave placeholder col-12"></span>}
            </h5>
            <div
              role="button"
              className="px-1 fs-3 text-danger"
              onClick={() => toggleFollow(team.id)}
            >
              {team && (followed.includes(team.id) ? <BsSuitHeartFill /> : <BsSuitHeart />)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamDivision
