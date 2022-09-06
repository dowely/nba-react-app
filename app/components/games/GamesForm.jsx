import React, { useState, useEffect, useContext } from "react"
import { GamesDispatch } from "../../providers/GamesProvider.jsx"
import { AppDispatch, AppState } from "../../providers/AppProvider.jsx"
import { parseSearchParams } from "../../helpers.js"

function GamesForm({ params, setParams, setRivalry }) {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const gamesDispatch = useContext(GamesDispatch)

  const [query, setQuery] = useState(parseSearchParams(params))

  const [seasons, setSeasons] = useState(query["seasons[]"] || ["byDates"])

  const [teams, setTeams] = useState(
    !query["team_ids[]"]
      ? ["all", "all"]
      : !query["team_ids[]"][1]
      ? [query["team_ids[]"][0], "all"]
      : query["team_ids[]"]
  )

  const [startDate, setStartDate] = useState(query["start_date"] || "")
  const [endDate, setEndDate] = useState(query["end_date"] || "")

  useEffect(() => {
    const newQuery = parseSearchParams(params)

    if (queriesAreDifferent(query, newQuery)) setQuery(newQuery)
  }, [params])

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      const fetchParams = structuredClone(query)

      if (fetchParams["team_ids[]"]) {
        fetchParams["team_ids[]"].splice(1)
      }

      fetchParams["per_page"] = 100

      gamesDispatch({
        type: "fetchGames",
        params: fetchParams
      })

      if (teams[0] !== "all" && teams[1] !== "all") {
        setRivalry([teams[0], teams[1]])
      } else {
        setRivalry(false)
      }
    }
  }, [query])

  function queriesAreDifferent(oldOne, newOne) {
    for (const key in oldOne) {
      if (!newOne.hasOwnProperty(key)) return true
    }

    for (const key in newOne) {
      if (!oldOne.hasOwnProperty(key)) return true
    }

    for (const key in oldOne) {
      if (key.endsWith("[]")) {
        if (arraysAreDifferent(oldOne[key], newOne[key])) return true
      } else {
        if (oldOne[key] !== newOne[key]) return true
      }
    }

    return false
  }

  function arraysAreDifferent(arr1, arr2) {
    if (arr1.length !== arr2.length) return true

    for (const el of arr1) {
      if (!arr2.includes(el)) return true
    }

    for (const el of arr2) {
      if (!arr1.includes(el)) return true
    }

    return false
  }

  function handleSubmit(e) {
    e.preventDefault()

    const params = {}

    if (seasons[0] !== "byDates") params["seasons[]"] = seasons

    if (teams[0] !== "all" || teams[1] !== "all")
      params["team_ids[]"] = teams.filter(id => id !== "all")

    if (startDate !== "") params["start_date"] = startDate

    if (endDate !== "") params["end_date"] = endDate

    if (!Object.keys(params).length) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: "Please select at least one of these fields: Season, Start date, End date",
          color: "danger"
        }
      })

      return
    }

    if (
      params["start_date"] &&
      params["end_date"] &&
      new Date(params["start_date"]).getTime() > new Date(params["end_date"]).getTime()
    ) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: "Please make sure the end date is later than the start date",
          color: "danger"
        }
      })

      return
    }

    if (!queriesAreDifferent(query, params)) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: "Please modify filters first",
          color: "warning"
        }
      })

      return
    }

    setParams(params)
  }

  return (
    <div className="card col-lg-9 mt-4">
      <h2 className="card-header">Search</h2>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="season" className="form-label">
              Season
            </label>
            <select
              className="form-select"
              id="season"
              onChange={e => {
                setSeasons([e.target.value])

                if (e.target.value !== "byDates") {
                  setStartDate("")
                  setEndDate("")
                }
              }}
              value={seasons[0]}
            >
              {Array.from({ length: 30 }, (value, index) => {
                if (!index)
                  return (
                    <option value={"byDates"} key={index}>
                      By dates
                    </option>
                  )

                value = new Date().getFullYear() + 1 - index

                return (
                  <option value={value} key={index}>
                    {value}-{(value + 1).toString().substring(2)}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="col-md-4 mt-md-0 mt-4">
            <label htmlFor="teamOne" className="form-label">
              Team
            </label>
            <select
              className="form-select"
              id="teamOne"
              onChange={e => setTeams(prev => [e.target.value, prev[1]])}
              value={teams[0]}
            >
              <option value="all">All</option>
              {appState.teams
                .filter(team => parseInt(teams[1]) !== team.id)
                .map(team => {
                  return (
                    <option key={team.name} value={team.id}>
                      {team.full_name}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="form-text text-center col-md-1 align-self-end mb-md-2 mt-md-0 mt-3">
            vs
          </div>
          <div className="col-md-4">
            <label htmlFor="teamTwo" className="form-label">
              Team
            </label>
            <select
              className="form-select"
              id="teamTwo"
              onChange={e => setTeams(prev => [prev[0], e.target.value])}
              value={teams[1]}
            >
              <option value="all">All</option>
              {appState.teams
                .filter(team => parseInt(teams[0]) !== team.id)
                .map(team => (
                  <option key={team.name} value={team.id}>
                    {team.full_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mt-md-4 mt-1 gy-4 gy-md-0">
          <div className="col-md-3">
            <label htmlFor="startDate" className="form-label">
              Start date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              disabled={seasons[0] === "byDates" ? undefined : true}
              onChange={e => setStartDate(e.target.value)}
              value={startDate}
            />
          </div>
          <div className="col-md-3 offset-md-1">
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              disabled={seasons[0] === "byDates" ? undefined : true}
              onChange={e => setEndDate(e.target.value)}
              value={endDate}
            />
          </div>
          <div className="col-md-4 offset-md-1 d-flex align-items-end py-3 py-md-0">
            <button type="submit" className="btn btn-primary flex-fill">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default GamesForm
