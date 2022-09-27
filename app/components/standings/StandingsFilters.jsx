import React, { useState, useEffect } from "react"

function StandingsFilters({ filter, setFilter, season }) {
  const [latestSeason, setLatestSeason] = useState()

  useEffect(() => {
    if (season && !latestSeason) setLatestSeason(season)
  }, [season])

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
      <select className="form-select form-select-sm" id="season" onChange={() => {}} value={season}>
        {options}
      </select>
    )
  }

  return (
    <div className="card-header">
      <div className="float-md-end mb-3 mb-md-0">
        <div className="row">
          <div className="col-6 col-md-auto px-1">
            <select
              className="form-select form-select-sm"
              id="division"
              onChange={() => {}}
              value=""
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          {!season && (
            <div className="col-6 col-md-auto px-1 d-flex justify-content-center align-items-center px-3">
              <div className="mx-1">
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>

              <div className="mx-1">
                <div
                  className="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                  style={{ animationDelay: "187.5ms" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>

              <div className="mx-1">
                <div
                  className="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                  style={{ animationDelay: "375ms" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}
          {season && <div className="col-6 col-md-auto px-1">{generateSeasonSelect()}</div>}
        </div>
      </div>
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <h3 className="nav-link fs-5 fw-normal active" role="button">
            League
          </h3>
        </li>
        <li className="nav-item">
          <h3 className="nav-link fs-5 fw-normal" role="button">
            East
          </h3>
        </li>
        <li className="nav-item">
          <h3 className="nav-link fs-5 fw-normal" role="button">
            West
          </h3>
        </li>
      </ul>
    </div>
  )
}

export default StandingsFilters
