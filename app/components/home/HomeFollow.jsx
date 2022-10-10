import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import { FaTimesCircle } from "react-icons/fa"

function HomeFollow() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const teamIds = JSON.parse(appState.followedTeams)

  function unFollow(teamId) {
    const teamName = appState.teams.find(team => team.id === teamId).full_name

    appDispatch({ type: "toggleFollow", teamId })

    appDispatch({
      type: "flashMessage",
      msg: {
        text: `${teamName} games will no longer be displayed in your feed`,
        color: "danger"
      }
    })
  }

  return (
    <div className="card">
      <h3 className="card-header">Followed Teams</h3>
      {appState.teams.length !== 30 && (
        <div className="text-center my-5">
          <div
            className="spinner-grow text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {appState.teams.length === 30 &&
        (teamIds ? (
          <ul className="list-group list-group-flush">
            {appState.teams
              .filter(({ id }) => teamIds.includes(id))
              .map(team => (
                <li key={team.id} className="list-group-item hstack gap-2 py-sm-3">
                  <div className="col-3">
                    <img
                      src={team.logo}
                      alt={`A ${team.full_name} team logo`}
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="mb-0">
                    <Link className="anchor" to={`/teams/${team.id}`}>
                      <span className="d-sm-none">{team.name}</span>
                      <span className="d-none d-sm-inline-block">{team.full_name}</span>
                    </Link>
                  </h5>
                  <div
                    role="button"
                    onClick={() => unFollow(team.id)}
                    className="text-secondary fs-1 ms-auto"
                  >
                    <FaTimesCircle />
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="card-body">
            <p className="card-text">
              You have not followed any team yet. Let's explore <Link to="/teams">them.</Link>
            </p>
          </div>
        ))}
    </div>
  )
}

export default HomeFollow
