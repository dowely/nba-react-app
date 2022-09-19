import React, { useState, useEffect, useContext } from "react"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import { StandingsState, StandingsDispatch } from "../../providers/StandingsProvider.jsx"

function TeamHeader({ team }) {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const standingsState = useContext(StandingsState)
  const standingsDispatch = useContext(StandingsDispatch)

  const [standing, setStanding] = useState()

  const [followed, setFollowed] = useState(
    (JSON.parse(appState.followedTeams) || []).includes(team.id)
  )
  const [toggled, setToggled] = useState(0)

  useEffect(() => {
    const teamRecord = standingsState.standings.find(record => record.teamId === team.id)

    if (!teamRecord) {
      standingsDispatch({ type: "createTeamRecords", ids: [team.id] })
    } else if (teamRecord && teamRecord.seasons.length) {
      if (teamRecord.seasons[0].season < new Date().getFullYear()) setStanding({})
      else setStanding(teamRecord.seasons[0])
    }
  }, [standingsState.standings])

  useEffect(() => {
    const arr = JSON.parse(appState.followedTeams) || []

    if (arr.includes(team.id) && !followed) setFollowed(true)
    else if (!arr.includes(team.id) && followed) setFollowed(false)
  }, [appState.followedTeams])

  useEffect(() => {
    if (toggled) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: followed
            ? `${team.full_name} games will now populate your feed`
            : `${team.full_name} games will no longer be displayed in your feed`,
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
                <img className="img-fluid" src={team.logo} alt={`The ${team.name} logo`} />
              </div>
              <div className="col-8">
                <div className="row gy-3">
                  <h1 className="col-12 mb-0">{team.full_name}</h1>
                  <div className="col-6 d-grid">
                    <button
                      type="button"
                      className={"fs-5 btn " + (followed ? "btn-danger" : "btn-primary")}
                      onClick={() => {
                        setToggled(prev => prev + 1)

                        appDispatch({ type: "toggleFollow", teamId: team.id })
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
                  {Object.keys(standing).length ? (
                    standing.ppg
                  ) : (
                    <span className="d-block w-50 mx-auto my-3 border-bottom border-1 border-secondary border-opacity-50" />
                  )}
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
                  {Object.keys(standing).length ? (
                    standing.oppg
                  ) : (
                    <span className="d-block w-50 mx-auto my-3 border-bottom border-1 border-secondary border-opacity-50" />
                  )}
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
                    <span className="d-block w-50 mx-auto my-3 border-bottom border-1 border-secondary border-opacity-50" />
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
                  {Object.keys(standing).length ? (
                    standing.strk
                  ) : (
                    <span className="d-block w-50 mx-auto my-3 border-bottom border-1 border-secondary border-opacity-50" />
                  )}
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
