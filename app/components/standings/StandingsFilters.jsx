import React, { useState, useEffect, useContext } from "react"
import { AppState } from "../../providers/AppProvider.jsx"
import StandingLoadingSelect from "./StandingLoadingSelect.jsx"

function StandingsFilters({ filter, setFilter, season, setSeason }) {
  const appState = useContext(AppState)

  const [latestSeason, setLatestSeason] = useState()

  const [tabs, setTabs] = useState(filter)

  const divisions = appState.teams
    .map(team => ({ div: team.division, conf: team.conference }))
    .filter((item, index, arr) => index === arr.findIndex(instance => instance.div === item.div))

  useEffect(() => {
    const filteredDivision = divisions.find(({ div }) => div === filter)

    const conf = filteredDivision ? filteredDivision.conf : filter

    if (conf !== tabs) setTabs(conf)
  }, [filter])

  useEffect(() => {
    if (season && !latestSeason) setLatestSeason(season)
  }, [season])

  function generateDivisionSelect() {
    return (
      <select
        className="form-select form-select-sm"
        id="division"
        onChange={e => setFilter(e.target.value)}
        value={filter}
      >
        {[
          <option key={-1} value={tabs}>
            All divisions
          </option>
        ].concat(
          divisions
            .filter(({ conf }) => tabs === "all" || conf === tabs)
            .map(({ div }, index) => (
              <option key={index} value={div}>
                {div}
              </option>
            ))
        )}
      </select>
    )
  }

  function generateSeasonSelect() {
    const options = Array.from({ length: 11 }, (_, index) => {
      const year = latestSeason && latestSeason - index

      return (
        <option key={index} value={year}>{`${year} - ${(year + 1)
          .toString()
          .substring(2)}`}</option>
      )
    })

    return (
      <select
        className="form-select form-select-sm"
        id="season"
        onChange={e => {
          setSeason(parseInt(e.target.value))
        }}
        value={season}
      >
        {options}
      </select>
    )
  }

  return (
    <div className="card-header">
      <div className="float-md-end mb-3 mb-md-0">
        <div className="row">
          {appState.teams.length !== 30 && <StandingLoadingSelect />}
          {appState.teams.length === 30 && (
            <div className="col-6 col-md-auto px-1">{generateDivisionSelect()}</div>
          )}
          {!season && <StandingLoadingSelect />}
          {season && <div className="col-6 col-md-auto px-1">{generateSeasonSelect()}</div>}
        </div>
      </div>
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <h3
            className={"nav-link fs-5 fw-normal " + (tabs === "all" ? "active" : "")}
            role="button"
            onClick={() => setFilter("all")}
          >
            League
          </h3>
        </li>
        <li className="nav-item">
          <h3
            className={"nav-link fs-5 fw-normal " + (tabs === "East" ? "active" : "")}
            role="button"
            onClick={() => setFilter("East")}
          >
            East
          </h3>
        </li>
        <li className="nav-item">
          <h3
            className={"nav-link fs-5 fw-normal " + (tabs === "West" ? "active" : "")}
            role="button"
            onClick={() => setFilter("West")}
          >
            West
          </h3>
        </li>
      </ul>
    </div>
  )
}

export default StandingsFilters

/**
 * 
 * const divisions = appState.teams
      .map(team => ({ div: team.division, conf: team.conference }))
      .filter((item, index, arr) => index === arr.findIndex(instance => instance.div === item.div))
      .filter(({ conf }, _, arr) =>
        filter === "all" || conf === filter
          ? true
          : arr.find(({ div }) => div === filter)
          ? conf === arr.find(({ div }) => div === filter).conf
          : false
      )

      const allDivisionsVal = divisions
      .filter(({ conf }) => conf === "West")
      .find(({ div }) => div === filter)
      ? "West"
      : divisions.filter(({ conf }) => conf === "East").find(({ div }) => div === filter)
      ? "East"
      : "all"
 */
