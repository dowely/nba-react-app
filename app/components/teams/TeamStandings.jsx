import React, { useContext } from "react"
import { useImmerReducer } from "use-immer"
import { AppState } from "../../providers/AppProvider.jsx"
import TeamProvider from "../../providers/TeamProvider.jsx"
import TeamStanding from "./TeamStanding.jsx"

function TeamStandings({ team }) {
  const appState = useContext(AppState)

  const initialState = {
    confTeams: appState.teams
      .filter(item => item.conference === team.conference)
      .map(item => ({ ...item, pct: undefined }))
  }

  function reducer(draft, action) {}

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  /*
  const table = confTeams.map((team, index) => {
    const order = {}

    return (
      <TeamProvider key={index} team={team} pct={order}>
        <TeamStanding setPct={val => (order.pct = val)} />
      </TeamProvider>
    )
  })
*/
  return (
    <div className="card">
      <h3 className="card-header">Standing</h3>
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
          {state.confTeams.map((team, index) => (
            <TeamProvider key={index} team={team}>
              <TeamStanding />
            </TeamProvider>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamStandings
