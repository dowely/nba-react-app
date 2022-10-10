import React, { useState, useEffect, useContext } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { AppState, AppDispatch } from "../providers/AppProvider.jsx"
import { dateGenerator } from "../helpers"

function Toast() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const [gameTime, setGameTime] = useState()
  const [gameDistance, setGameDistance] = useState()

  useEffect(() => {
    if (appState.toast.data) {
      const gameT = dateGenerator(appState.toast.data.gameDate, appState.toast.data.gameTime)

      const gameD = Math.abs(gameT.getTime() - new Date().getTime())

      setGameTime(gameT)

      setGameDistance(gameD)
    }
  }, [appState.toast.data])

  useEffect(() => {
    if (gameTime) {
      const interval = setInterval(() => {
        setGameDistance(Math.abs(gameTime.getTime() - new Date().getTime()))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [gameTime])

  function headerDate() {
    if (!gameTime) return

    const nowTime = new Date()

    if (gameTime.toDateString() === nowTime.toDateString()) return "today"

    nowTime.setDate(nowTime.getDate() + 1)

    if (gameTime.toDateString() === nowTime.toDateString()) return "tomorrow"

    return gameTime.toLocaleDateString()
  }

  function timer() {
    if (!gameDistance) return

    const timeLeft = [
      ["days", 8.64e7],
      ["hours", 3.6e6],
      ["minutes", 6e4],
      ["seconds", 1e3]
    ].reduce(
      (accumulator, [unit, divider]) => ({
        ...accumulator,
        [unit]: Math.floor(accumulator.remainder / divider),
        remainder: accumulator.remainder % divider
      }),
      { remainder: gameDistance }
    )

    return (
      <div className="row text-center">
        <span className="col-2 ms-auto">{timeLeft.days}</span>
        <span className="col-1 px-0">:</span>
        <span className="col-2">{timeLeft.hours.toString().padStart(2, "0")}</span>
        <span className="col-1 px-0">:</span>
        <span className="col-2">{timeLeft.minutes.toString().padStart(2, "0")}</span>
        <span className="col-1 px-0">:</span>
        <span className="col-2 me-auto">{timeLeft.seconds.toString().padStart(2, "0")}</span>

        <span className="col-2 ms-auto">days</span>
        <span className="col-1 px-0"></span>
        <span className="col-2">hrs</span>
        <span className="col-1 px-0"></span>
        <span className="col-2">min</span>
        <span className="col-1 px-0"></span>
        <span className="col-2 me-auto">sec</span>
      </div>
    )
  }

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
          <small>{headerDate()}</small>
          <button
            type="button"
            className="btn-close"
            onClick={() => appDispatch({ type: "hideToast" })}
          ></button>
        </div>
        {appState.toast.data && gameTime && (
          <div className="toast-body">
            <div className="row">
              <div className="col-4 pe-1">
                <img
                  src={appState.toast.data.homeTeam.logo}
                  alt={`A ${appState.toast.data.homeTeam.full_name} team logo.`}
                  className="img-fluid img-thumbnail"
                />
                <h6 className="text-center mt-2">{appState.toast.data.homeTeam.name}</h6>
              </div>
              <div className="col-4">
                <h6 className="text-center my-2 border py-2">
                  {gameTime.toLocaleTimeString([], {
                    timeStyle: "short"
                  })}
                </h6>
                <div className="display-6 text-center">vs</div>
              </div>
              <div className="col-4 ps-1">
                <img
                  src={appState.toast.data.visitorTeam.logo}
                  alt={`A ${appState.toast.data.visitorTeam.full_name} team logo.`}
                  className="img-fluid img-thumbnail"
                />
                <h6 className="text-center mt-2">{appState.toast.data.visitorTeam.name}</h6>
              </div>
            </div>
            <p className="mb-2 text-center">The game starts in:</p>
            {timer()}
            <p className="border-top mb-0 mt-2 pt-2">
              *The game time is presented in your local time.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Toast
