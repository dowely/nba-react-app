import React, { useState, useEffect, useContext } from "react"
import useGames from "../../hooks/useGames"
import { useImmerReducer } from "use-immer"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import TeamProvider from "../../providers/TeamProvider.jsx"
import TeamStanding from "./TeamStanding.jsx"

function TeamStandings({ team }) {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const confTeams = appState.teams.filter(item => item.conference === team.conference)

  const [gameRequest, setGameRequest] = useState({
    per_page: 100,
    "team_ids[]": confTeams.map(team => team.id),
    "seasons[]": [new Date().getFullYear()]
  })

  const games = useGames(gameRequest, appDispatch)

  useEffect(() => {
    if (games && !games.length)
      setGameRequest(prev => ({
        ...prev,
        "seasons[]": [new Date().getFullYear() - 1]
      }))
  }, [games])

  const initialState = {
    ordered: false,
    orderedTeams: confTeams.map(item => ({ ...item, pct: undefined }))
  }

  function reducer(draft, action) {}

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {}, [state.confTeams])

  return (
    <div className="card">
      <h3 className="card-header">Standings</h3>

      {!state.ordered && (
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

      {state.ordered && (
        <>
          <div className="card-body">
            <div className="row">
              <h4 className="col-7">foo</h4>
              <div className="col-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="divConf"
                    id="radioConf"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="radioConf">
                    Conference
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="divConf" id="radioDiv" />
                  <label className="form-check-label" htmlFor="radioDiv">
                    Division
                  </label>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-sm table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">W</th>
                <th scope="col">L</th>
                <th scope="col">PCT</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {state.orderedTeams.map((team, index) => (
                <TeamProvider key={index} games={games} team={team}>
                  <TeamStanding dispatch={dispatch} />
                </TeamProvider>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default TeamStandings
