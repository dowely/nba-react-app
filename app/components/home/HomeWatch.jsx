import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AiOutlineEye } from "react-icons/ai"
import { FaTimesCircle } from "react-icons/fa"
import { AppState, AppDispatch } from "../../providers/AppProvider.jsx"
import { GamesState, GamesDispatch } from "../../providers/GamesProvider.jsx"
import { enhancedDate } from "../../helpers"

function HomeWatch() {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  const gamesState = useContext(GamesState)
  const gamesDispatch = useContext(GamesDispatch)

  const [list, setList] = useState()

  useEffect(() => {
    if (appState.watchlist) {
      gamesDispatch({ type: "fetchGamesByIds", gamesIds: JSON.parse(appState.watchlist) })
    } else {
      setList({})
    }
  }, [appState.watchlist])

  useEffect(() => {
    if (gamesState.games && appState.teams.length === 30) {
      const list = {}

      const games = gamesState.games.slice().sort((a, b) => {
        const isoStrA = a.date.replace(a.date.substring(a.date.indexOf(" ")), "T00:00:00.000Z")

        const isoStrB = b.date.replace(b.date.substring(b.date.indexOf(" ")), "T00:00:00.000Z")

        return new Date(isoStrA).getTime() - new Date(isoStrB).getTime()
      })

      for (let game of games) {
        const date = enhancedDate(game.date.substring(0, game.date.indexOf(" ")))

        if (game.status.indexOf(":") === -1) {
          appDispatch({ type: "removeGameWatch", gameId: game.id })

          continue
        }

        const key = `${date.weekDay}, ${date.month} ${date.monthDay}, ${date.year}`

        if (key in list) list[key].push(game)
        else list[key] = [game]
      }

      setList(list)
    }
  }, [gamesState.games, appState.teams])

  function generateList() {
    const listItems = []

    for (let key in list) {
      listItems.push(
        <li key={key} className="list-group-item list-group-item-primary">
          {key}
        </li>
      )

      listItems.push(
        ...list[key].map((game, i) => {
          const homeTeam = appState.teams.find(team => team.id === game.home_team.id)

          const visitorTeam = appState.teams.find(team => team.id === game.visitor_team.id)

          return (
            <li key={key + "-" + i} className="list-group-item d-flex align-items-center py-md-3">
              <div className="col-2">
                <img
                  src={homeTeam.logo}
                  alt={`A ${homeTeam.full_name} team logo`}
                  className="img-fluid"
                />
              </div>
              <h6 className="col-2 mb-0 mt-1 text-center">
                <Link className="anchor" to={`/teams/${homeTeam.id}`}>
                  {homeTeam.abbreviation}
                </Link>
              </h6>
              <span className="col-auto px-1">:</span>
              <div className="col-2">
                <img
                  src={visitorTeam.logo}
                  alt={`A ${visitorTeam.full_name} team logo`}
                  className="img-fluid"
                />
              </div>
              <h6 className="col-2 mb-0 mt-1 text-center">
                <Link className="anchor" to={`/teams/${visitorTeam.id}`}>
                  {visitorTeam.abbreviation}
                </Link>
              </h6>
              <div className="btn-group btn-group-sm ms-auto" role="group">
                <button
                  type="button"
                  className={
                    "btn " +
                    (appState.toast.isVisible && appState.toast.data.gameId === game.id
                      ? "btn-info"
                      : "btn-secondary")
                  }
                  onClick={() =>
                    appDispatch({
                      type: "toggleToast",
                      toastData: {
                        homeTeam,
                        visitorTeam,
                        gameId: game.id,
                        gameDate: game.date,
                        gameTime: game.status
                      }
                    })
                  }
                >
                  Details
                </button>
                <button
                  type="button"
                  className="btn btn-secondary border border-light border-opacity-50 border-top-0 border-end-0 border-bottom-0"
                  onClick={() => {
                    if (appState.toast.isVisible && appState.toast.data.gameId === game.id)
                      appDispatch({ type: "hideToast" })

                    appDispatch({ type: "removeGameWatch", gameId: game.id })
                  }}
                >
                  <FaTimesCircle />
                </button>
              </div>
            </li>
          )
        })
      )
    }

    return <ul className="list-group list-group-flush">{listItems}</ul>
  }

  return (
    <div className="card">
      <h3 className="card-header">My Watchlist</h3>
      {!list && (
        <div className="text-center my-5">
          <div
            className="spinner-grow text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {list && Object.keys(list).length === 0 && (
        <div className="card-body">
          <p className="card-text">
            You have not added any game to your watchlist. Explore the{" "}
            <Link to="/games">games</Link> and toggle the icon{" "}
            <span
              className="badge text-bg-primary fs-3 d-inline-flex align-items-center align-middle"
              style={{
                "--bs-badge-padding-x": "0.1em",
                "--bs-badge-padding-y": "0.01em"
              }}
            >
              <AiOutlineEye />
            </span>
          </p>
        </div>
      )}
      {list && Boolean(Object.keys(list).length) && generateList()}
    </div>
  )
}

export default HomeWatch
