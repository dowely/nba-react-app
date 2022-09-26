import React, { useEffect } from "react"

function StandingsFilters({ filter, setFilter }) {
  return (
    <div className="card-header">
      <div className="row float-md-end  mb-3 mb-md-0">
        <div className="col-6 px-1">
          <select className="form-select form-select-sm" id="division" onChange={() => {}} value="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="col-6 px-1">
          <select className="form-select form-select-sm" id="season" onChange={() => {}} value="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <h3 class="nav-link fs-5 fw-normal active" role="button">
            League
          </h3>
        </li>
        <li class="nav-item">
          <h3 class="nav-link fs-5 fw-normal" role="button">
            East
          </h3>
        </li>
        <li class="nav-item">
          <h3 class="nav-link fs-5 fw-normal" role="button">
            West
          </h3>
        </li>
      </ul>
    </div>
  )
}

export default StandingsFilters
