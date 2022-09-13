import React, { useState, useEffect, useContext } from "react"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import { TeamState } from "../../providers/TeamProvider.jsx"

function TeamHeader() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const teamState = useContext(TeamState)

  const [standing, setStanding] = useState()
  const [followed, setFollowed] = useState(
    (JSON.parse(appState.followedTeams) || []).includes(teamState.team.id)
  )
  const [toggled, setToggled] = useState(0)

  useEffect(() => {
    if (teamState.standings.length) {
      if (teamState.standings[0].season < new Date().getFullYear() - 1) {
        setStanding({})
      } else {
        setStanding(teamState.standings[0])
      }
    }
  }, [teamState.standings])

  useEffect(() => {
    const arr = JSON.parse(appState.followedTeams) || []

    if (arr.includes(teamState.team.id) && !followed) setFollowed(true)
    else if (!arr.includes(teamState.team.id) && followed) setFollowed(false)
  }, [appState.followedTeams])

  useEffect(() => {
    if (toggled) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: followed
            ? `${teamState.team.full_name} games will now populate your feed`
            : `${teamState.team.full_name} games will no longer be displayed in your feed`,
          color: followed ? "success" : "danger"
        }
      })
    }
  }, [followed])

  return (
    <header className="border-bottom border-2 border-secondary">
      <div className="container">
        <div className="row py-4 gy-4">
          <div className="col-lg-7">
            <div className="row align-items-center">
              <div className="col-4 text-center">
                <img
                  className="img-fluid"
                  src={teamState.team.logo}
                  alt={`The ${teamState.team.name} logo`}
                />
              </div>
              <div className="col-8">
                <div className="row gy-3">
                  <h1 className="col-12 mb-0">{teamState.team.full_name}</h1>
                  <div className="col-6 d-grid">
                    <button
                      type="button"
                      className={"fs-5 btn " + (followed ? "btn-danger" : "btn-primary")}
                      onClick={() => {
                        setToggled(prev => prev + 1)

                        appDispatch({ type: "toggleFollow", teamId: teamState.team.id })
                      }}
                    >
                      {followed ? "Unfollow" : "Follow"}
                    </button>
                  </div>

                  <div className="col-6 d-flex align-items-center">
                    {standing && (
                      <p className="ms-2 mb-0 fs-3">
                        {Object.keys(standing).length
                          ? `${standing.winsLosses[0]} - ${standing.winsLosses[1]}`
                          : `0 - 0`}
                      </p>
                    )}
                    {!standing && (
                      <p className="ms-2 mb-1 fs-5 placeholder-glow flex-grow-1">
                        <span className="placeholder col-7"></span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 hstack text-center">
            <div className="w-25 border-end">
              <h5>PPG</h5>
              {standing && (
                <p className="fs-5 mb-0">
                  {Object.keys(standing).length ? standing.ppg : <hr className="w-50 mx-auto" />}
                </p>
              )}
              {!standing && (
                <p className="fs-5 mb-0 placeholder-glow">
                  <span className="placeholder col-7"></span>
                </p>
              )}
            </div>
            <div className="w-25 border-end">
              <h5>OPPG</h5>
              {standing && (
                <p className="fs-5 mb-0">
                  {Object.keys(standing).length ? standing.oppg : <hr className="w-50 mx-auto" />}
                </p>
              )}
              {!standing && (
                <p className="fs-5 mb-0 placeholder-glow">
                  <span className="placeholder col-7"></span>
                </p>
              )}
            </div>
            <div className="w-25 border-end">
              <h5>L10</h5>
              {standing && (
                <p className="fs-5 mb-0">
                  {Object.keys(standing).length ? (
                    `${standing.l10[0]} - ${standing.l10[1]}`
                  ) : (
                    <hr className="w-50 mx-auto" />
                  )}
                </p>
              )}
              {!standing && (
                <p className="fs-5 mb-0 placeholder-glow">
                  <span className="placeholder col-7"></span>
                </p>
              )}
            </div>
            <div className="w-25">
              <h5>STRK</h5>
              {standing && (
                <p className="fs-5 mb-0">
                  {Object.keys(standing).length ? standing.strk : <hr className="w-50 mx-auto" />}
                </p>
              )}
              {!standing && (
                <p className="fs-5 mb-0 placeholder-glow">
                  <span className="placeholder col-7"></span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TeamHeader
