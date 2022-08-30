import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GamesDispatch } from "../../providers/GamesProvider.jsx"
import { AppDispatch } from "../../providers/AppProvider.jsx"
import { foo } from "../../helpers.js"

function GamesForm({ params, setParams }) {
  const navigate = useNavigate()

  const gamesDispatch = useContext(GamesDispatch)
  const appDispatch = useContext(AppDispatch)

  const [seasons, setSeasons] = useState(params.getAll("seasons[]"))

  const [query, setQuery] = useState(parseSearchParams())

  useEffect(() => {
    const newQuery = parseSearchParams("foo")

    foo()

    if (queriesAreDifferent(query, newQuery)) setQuery(newQuery)
  }, [params])

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      gamesDispatch({
        type: "fetchGames",
        params: {
          ...query,
          per_page: 100
        }
      })
    }
  }, [query])

  function parseSearchParams(foo) {
    console.log(foo)
    return Array.from(params.entries())
      .filter(([param]) => ["seasons[]", "team_ids[]", "start_date"].includes(param))
      .reduce((prevEntry, [currParam, currValue]) => {
        if (prevEntry[currParam]) {
          prevEntry[currParam].push(currValue)
        } else if (currParam.endsWith("[]")) {
          prevEntry[currParam] = [currValue]
        } else {
          prevEntry[currParam] = currValue
        }
        return prevEntry
      }, {})
  }

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
        if (oldOne[key] !== newOne[key]) true
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

    if (seasons.length && seasons[0] !== "byDates") params["seasons[]"] = seasons

    if (Object.keys(params).length) {
      setParams(params)
    } else {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: "Please select at least one of these fields: Season, Start date, End date",
          color: "danger"
        }
      })
    }
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
                console.log(seasons)
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
            <select className="form-select" id="teamOne">
              <option>all</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="form-text text-center col-md-1 align-self-end mb-md-2 mt-md-0 mt-3">
            vs
          </div>
          <div className="col-md-4">
            <label htmlFor="teamTwo" className="form-label">
              Team
            </label>
            <select className="form-select" id="teamTwo">
              <option>all</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="row mt-md-4 mt-1 gy-4 gy-md-0">
          <div className="col-md-3">
            <label htmlFor="startDate" className="form-label">
              Start date
            </label>
            <input type="date" className="form-control" id="startDate" />
          </div>
          <div className="col-md-3 offset-md-1">
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input type="date" className="form-control" id="endDate" />
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
