import React, { useEffect, useContext } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { AppState, AppDispatch } from "../providers/AppProvider.jsx"
import { timer } from "../helpers"

function Toast() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

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
          <small>
            {appState.toast.data &&
              timer(appState.toast.data.gameDate, appState.toast.data.gameTime)}
          </small>
          <button
            type="button"
            className="btn-close"
            onClick={() => appDispatch({ type: "hideToast" })}
          ></button>
        </div>
        <div className="toast-body">
          {appState.toast.data && appState.toast.data.homeTeam.full_name}
          <br /> *The game time is presented in your local time.
        </div>
      </div>
    </div>
  )
}

export default Toast
