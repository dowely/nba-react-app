import React from "react"

function StandingLoadingSelect() {
  return (
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
  )
}

export default StandingLoadingSelect
