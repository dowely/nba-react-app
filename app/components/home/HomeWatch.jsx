import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AiOutlineEye } from "react-icons/ai"
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
      setList()
      gamesDispatch({ type: "fetchGamesByIds", gamesIds: JSON.parse(appState.watchlist) })
    } else {
      setList({})
    }
  }, [appState.watchlist])

  useEffect(() => {
    if (gamesState.games) {
      const list = {}

      gamesState.games.forEach(game => {
        const date = enhancedDate(game.date)

        const key = `${date.weekDay}, ${date.month} ${date.monthDay}, ${date.year}`

        if (key in list) list[key].push(game)
        else list[key] = [game]
      })

      setList(list)
    }
  }, [gamesState.games])

  function generateList() {
    const listItems = []

    for (let key in list) {
      listItems.push(<li className="list-group-item list-group-item-primary">{key}</li>)

      listItems.push(...list[key].map(game => <li className="list-group-item">{game.id}</li>))
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
              role="button"
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
      {list && Object.keys(list).length && generateList()}
    </div>
  )
}

export default HomeWatch
