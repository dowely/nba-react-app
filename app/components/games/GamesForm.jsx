import React, { useState, useEffect, useContext } from "react"
import { GamesDispatch } from "../../providers/GamesProvider.jsx"
import { AppDispatch } from "../../providers/AppProvider.jsx"

function GamesForm({ params, setParams }) {
  const gamesDispatch = useContext(GamesDispatch)
  const appDispatch = useContext(AppDispatch)

  const [seasons, setSeasons] = useState(params.getAll("seasons[]"))

  useEffect(() => {
    if (Array.from(params.keys()).length) {
      const search = { per_page: 100 }

      for (const [param, value] of params.entries()) {
        if (search[param.slice(0, -2)]) {
          search[param.slice(0, -2)].push(value)
        } else if (param.endsWith("[]")) {
          search[param.slice(0, -2)] = [value]
        } else {
          search[param] = value
        }
      }

      console.log(search)

      gamesDispatch({
        type: "fetchGames",
        params: search
      })
    }
  }, [params])

  function handleSubmit(e) {
    e.preventDefault()

    const params = {}

    if (seasons[0] !== undefined) params["seasons[]"] = seasons

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
              onChange={e => setSeasons([e.target.value])}
              value={seasons[0]}
            >
              {Array.from({ length: 30 }, (value, index) => {
                if (!index)
                  return (
                    <option value={undefined} key={index}>
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
