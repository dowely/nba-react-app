import React, { useState, useEffect, useContext } from "react"
import { AppState } from "../../providers/AppProvider.jsx"
import { StandingsState, StandingsDispatch } from "../../providers/StandingsProvider.jsx"
import TeamStanding from "./TeamStanding.jsx"

function TeamStandings({ team }) {
  const appState = useContext(AppState)

  const standingsState = useContext(StandingsState)
  const standingsDispatch = useContext(StandingsDispatch)

  const [standingTeams, setStandingTeams] = useState()

  const [confTeams] = useState(appState.teams.filter(item => item.conference === team.conference))

  useEffect(() => {
    const missingRecords = []

    confTeams.forEach(team => {
      if (!standingsState.standings.find(record => record.teamId === team.id))
        missingRecords.push(team.id)
    })

    if (missingRecords.length) {
      standingsDispatch({ type: "createTeamRecords", ids: missingRecords })
    } else if (standingsState.standings.every(record => record.seasons.length)) {
      setStandingTeams(
        confTeams
          .map(team => ({
            ...team,
            standing: standingsState.standings.find(record => record.teamId === team.id).seasons[0]
          }))
          .sort((a, b) => b.standing.pct - a.standing.pct)
      )
    }
  }, [standingsState.standings])

  return (
    <div className="card">
      <h3 className="card-header">Standings</h3>

      {!standingTeams && (
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

      {standingTeams && (
        <>
          <div className="card-body">
            <div className="row">
              <h4 className="col-6">foo</h4>
              <div className="col-6">
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
                <th scope="col" className="ps-3">
                  Team
                </th>
                <th scope="col">W</th>
                <th scope="col">L</th>
                <th scope="col">PCT</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {standingTeams.map((standingTeam, index) => (
                <TeamStanding key={index} standingTeam={standingTeam} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default TeamStandings
