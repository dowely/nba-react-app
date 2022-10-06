import React, { useEffect, useContext } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { AppState } from "../providers/AppProvider.jsx"

function Toast() {
  const appState = useContext(AppState)

  return (
    <div
      className={"toast-wrapper " + (appState.toast.isVisible ? "toast-wrapper--is-visible" : "")}
    >
      <div
        className="toast show text-bg-secondary ms-auto"
        style={{ "--bs-toast-max-width": "none" }}
      >
        <div className="toast-header">
          <span
            role="button"
            className="badge text-bg-primary fs-4 d-inline-flex align-items-center align-middle me-2"
            style={{
              "--bs-badge-padding-x": "0.1em",
              "--bs-badge-padding-y": "0.01em"
            }}
          >
            <AiOutlineEye />
          </span>
          <strong className="me-auto">Watchlist game</strong>
          <small>11 mins ago</small>
          <button type="button" className="btn-close"></button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
          {appState.toast.data && appState.toast.data.homeTeam.full_name}
        </div>
      </div>
    </div>
  )
}

export default Toast
