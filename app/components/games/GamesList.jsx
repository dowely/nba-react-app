import React, { useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { GamesState } from "../../providers/GamesProvider.jsx"

function GamesList() {
  const gamesState = useContext(GamesState)

  const initialState = {
    page: 1,
    list: null
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "populateList":
        draft.list = formatGames(action.games)
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: "populateList",
      games: gamesState.games
    })
  }, [gamesState.games])

  function formatGames(rawGames) {
    if (!rawGames.length) return null

    const list = {}
    let count = 1

    for (const game of rawGames) {
      const date = game.date.substring(0, game.date.indexOf("T"))

      if (date in list) {
        list[date].games.push(game)
        list[date].onPage = Math.floor(count / 100) + 1
      } else {
        list[date] = { games: [game], onPage: Math.floor(count / 100) + 1 }
      }
      count++
    }

    return list
  }

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">Results</h2>
        <hr />
        {gamesState.isFetching && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {!gamesState.isFetching && !state.list && (
          <p className="card-text">There are no results for the selected parameters...</p>
        )}

        {!gamesState.isFetching && state.list && (
          <ul className="list-group list-group-flush">
            {Object.entries(state.list).map(dateCollection => {
              const date = new Date(dateCollection[0])
              const games = dateCollection[1].games

              return (
                <li className="list-group-item d-flex">
                  <div className="col-3">
                    <span className="lead">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednsday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ][date.getDay()] + ","}
                    </span>
                    <h4>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ][date.getMonth()] +
                        " " +
                        date.getDate() +
                        ", " +
                        date.getFullYear()}
                    </h4>
                    <small className="text-muted">{`${games.length} game${
                      games.length > 1 ? "s" : ""
                    }`}</small>
                  </div>
                  <div className="col-9">
                    <div className="row pt-2">
                      <h5 className="col-3">Time</h5>
                      <h5 className="col-6">Teams</h5>
                      <h5 className="col-3">Result</h5>
                    </div>
                    <hr />
                    <ul className="list-group list-group-flush">
                      {games.map(game => (
                        <li className="list-group-item d-flex px-0">{game.id}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default GamesList
