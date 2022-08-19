import React, { useState, useContext } from "react"
import { GamesDispatch } from "../../providers/GamesProvider.jsx"

function GamesForm() {
  const gamesDispatch = useContext(GamesDispatch)

  const [season, setSeason] = useState(new Date().getFullYear())

  function handleSubmit(e) {
    e.preventDefault()

    const params = {}

    if (season) params.seasons = [season]

    gamesDispatch({ type: "fetchGames", params })
  }

  return (
    <div className="card col-lg-9 mt-4">
      <h3 className="card-header">Search</h3>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="season" className="form-label">
              Season
            </label>
            <select
              className="form-select"
              id="season"
              onChange={e => setSeason(e.target.value)}
              value={season}
            >
              {Array.from({ length: 30 }, (value, index) => {
                value = new Date().getFullYear() - index

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
