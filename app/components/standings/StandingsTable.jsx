import React, { useState, useEffect, useContext } from "react"
import { BiRefresh } from "react-icons/bi"
import { AppState } from "../../providers/AppProvider.jsx"
import { StandingsState, StandingsDispatch } from "../../providers/StandingsProvider.jsx"
import StandingsRow from "./StandingsRow.jsx"

function StandingsTable({ filter, season, setSeason }) {
  const appState = useContext(AppState)

  const standingsState = useContext(StandingsState)
  const standingsDispatch = useContext(StandingsDispatch)

  const [tabIndex, setTabIndex] = useState(1)

  const [standingTeams, setStandingTeams] = useState()

  useEffect(() => {
    if (appState.teams.length === 30) {
      standingsDispatch({ type: "createTeamRecords", ids: appState.teams.map(team => team.id) })
    }
  }, [appState.teams])

  useEffect(() => {
    if (
      standingsState.standings.length === 30 &&
      standingsState.standings.every(record => record.seasons.length > 0)
    ) {
      setStandingTeams(
        appState.teams.map(team => ({
          ...team,
          seasons: standingsState.standings.find(record => record.teamId === team.id).seasons
        }))
      )
    }
  }, [standingsState.standings])

  useEffect(() => {
    console.log(standingTeams)
    if (standingTeams && !season) setSeason(standingTeams[0].seasons[0].season)
  }, [standingTeams])

  function handleTabIndex() {
    if (tabIndex === 4) setTabIndex(1)
    else setTabIndex(prev => prev + 1)
  }

  function generateThead() {
    const columns = [
      {
        label: "#",
        className: "pe-1"
      },
      {
        label: "Team",
        className: "position-relative border-end border-2 border-dark"
      },
      {
        label: "W",
        className:
          (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
          " text-center d-xl-table-cell ps-4 px-xl-3"
      },
      {
        label: "L",
        className:
          (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
          " text-center d-xl-table-cell px-3"
      },
      {
        label: "PCT",
        className:
          (tabIndex === 2
            ? "d-table-cell d-md-none ps-4"
            : tabIndex === 1 || tabIndex === 3
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell px-md-2 px-xl-3"
      },
      {
        label: "GB",
        className:
          (tabIndex === 2
            ? "d-table-cell d-md-none"
            : tabIndex === 1 || tabIndex === 3
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell px-2 px-md-3"
      },
      {
        label: "Home",
        className:
          (tabIndex === 3
            ? "d-table-cell d-md-none ps-3 pe-1"
            : tabIndex === 2 || tabIndex === 4
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell ps-md-4 pe-md-2 px-xl-3"
      },
      {
        label: "Away",
        className:
          (tabIndex === 3
            ? "d-table-cell d-md-none"
            : tabIndex === 2 || tabIndex === 4
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell px-1 px-md-3"
      },
      {
        label: "Div",
        className:
          (tabIndex === 4
            ? "d-table-cell ps-4"
            : tabIndex === 2
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell px-md-3"
      },
      {
        label: "Conf",
        className:
          (tabIndex === 4 ? "d-table-cell" : tabIndex === 2 ? "d-none d-md-table-cell" : "d-none") +
          " text-center d-xl-table-cell px-md-3"
      }
    ]

    return (
      <thead className="table-warning">
        <tr>
          {columns.map(column => (
            <th
              key={column.label}
              scope="col"
              style={{ backgroundClip: "padding-box" }}
              className={column.className}
            >
              {column.label}
              {column.label === "Team" && (
                <div
                  onClick={handleTabIndex}
                  role="button"
                  className="badge text-bg-primary fs-3 position-absolute start-100 top-50 translate-middle d-flex d-xl-none align-items-center"
                  style={{ "--bs-badge-padding-x": "0.1em", "--bs-badge-padding-y": "0.01em" }}
                >
                  <BiRefresh />
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  return (
    <div className="card-body">
      {appState.teams.length !== 30 && (
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem", "--bs-spinner-border-width": ".35rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {appState.teams.length === 30 && (
        <table className="table table-striped">
          {generateThead()}
          <tbody className="table-group-divider">
            {!standingTeams &&
              appState.teams.map((team, index) => (
                <StandingsRow
                  key={index}
                  rowNo={index + 1}
                  standingTeam={team}
                  season={season}
                  tabIndex={tabIndex}
                />
              ))}
            {standingTeams &&
              standingTeams.map((standingTeam, index) => (
                <StandingsRow
                  key={index}
                  rowNo={index + 1}
                  standingTeam={standingTeam}
                  season={season}
                  tabIndex={tabIndex}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StandingsTable
