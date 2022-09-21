import React, { useState, useEffect, useContext } from "react"
import { StandingsState, StandingsDispatch } from "../../providers/StandingsProvider.jsx"

function TeamHistory({ team }) {
  const standingsState = useContext(StandingsState)
  const standingsDispatch = useContext(StandingsDispatch)

  const historyCount = 4

  const [standingYears, setStandingYears] = useState()

  useEffect(() => {
    const teamRecord = standingsState.standings.find(record => record.teamId === team.id)

    if (!teamRecord) {
      setStandingYears(undefined)
    } else if (teamRecord && teamRecord.seasons.length) {
      setStandingYears([
        ...teamRecord.seasons.filter(
          standing => standing.season >= new Date().getFullYear() - historyCount
        )
      ])
    }
  }, [standingsState.standings, team])

  useEffect(() => {
    if (standingYears && standingYears.length < historyCount) {
      for (let i = standingYears[0].season; i >= new Date().getFullYear() - historyCount; i--) {
        if (!standingYears.find(standing => standing.season === i)) {
          standingsDispatch({ type: "createSeasonRecord", teamId: team.id, season: i })
          break
        }
      }
    }
  }, [standingYears])

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="mb-0">Team History</h3>
        <h3 className="mb-0">{`(${team.abbreviation})`}</h3>
      </div>

      {(!standingYears || standingYears.length < historyCount) && (
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

      {standingYears && standingYears.length >= historyCount && (
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th scope="col" className="ps-3">
                Season
              </th>
              <th scope="col" className="text-center">
                W
              </th>
              <th scope="col" className="text-center">
                L
              </th>
              <th scope="col" className="text-center">
                PCT
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {standingYears.map((standingYear, index) => (
              <tr key={index}>
                <td className="ps-3">{`${standingYear.season} - ${(standingYear.season + 1)
                  .toString()
                  .substring(2)}`}</td>
                <td className="text-center">{standingYear.winsLosses[0]}</td>
                <td className="text-center">{standingYear.winsLosses[1]}</td>
                <td className="pe-2 text-center">{standingYear.pct.toString().substring(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TeamHistory
