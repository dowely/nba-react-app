import React, { useState, useEffect, useContext } from "react"
import { StandingsState, StandingsDispatch } from "../../providers/StandingsProvider.jsx"

function TeamStats({ team }) {
  const standingsState = useContext(StandingsState)
  const standingsDispatch = useContext(StandingsDispatch)

  const [stats, setStats] = useState()

  useEffect(() => {
    const teamRecord = standingsState.standings.find(record => record.teamId === team.id)

    if (!teamRecord) {
      standingsDispatch({ type: "createTeamRecords", ids: [team.id] })
    } else if (teamRecord && teamRecord.seasons.length) {
      setStats(formatStats(teamRecord.seasons[0]))
    }
  }, [standingsState.standings])

  function formatStats(rawStanding) {
    return new Map([
      [
        "Season",
        (() => {
          const season = rawStanding.season

          return `${season} - ${(season + 1).toString().substring(2)}`
        })()
      ],
      ["Wins - Losses", rawStanding.winsLosses],
      ["% Wins", rawStanding.pct.toString().substring(1)],
      ...[
        "Home",
        "Away",
        "Div",
        "Conf",
        "East",
        "Atlantic",
        "Central",
        "Southeast",
        "West",
        "Northwest",
        "Pacific",
        "Southwest"
      ].map(key => [key, rawStanding[key.charAt(0).toLowerCase() + key.substring(1)]]),
      ...["PPG", "OPPG", "L10", "STRK"].map(key => [key, rawStanding[key.toLowerCase()]])
    ])
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="mb-0">Statistics</h3>
        <h3 className="mb-0">{stats && stats.get("Season")}</h3>
      </div>

      {!stats && (
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

      {stats && (
        <ul className="list-group list-group-flush">
          {Array.from(stats.entries())
            .filter(([key]) => key !== "Season")
            .map(([key, val]) => {
              const data = ["% Wins", "PPG", "OPPG", "STRK"].includes(key)
                ? val
                : `${val[0]} - ${val[1]}`

              return (
                <li
                  key={key}
                  className={
                    "list-group-item py-1 " +
                    (key === team.conference || key === team.division ? "fw-bold" : "")
                  }
                >
                  {key}
                  <span className="float-end">{data}</span>
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}

export default TeamStats
