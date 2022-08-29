import React, { useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { GamesState } from "../../providers/GamesProvider.jsx"

function GamesList({ noParams, params, setParams }) {
  const gamesState = useContext(GamesState)

  const initialState = {
    list: null,
    totalPages: 0,
    pagination: {
      step: 7,
      startsWith: 1,
      endsWith: 1
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "populateList":
        draft.list = formatGames(action.games)
        draft.totalPages = draft.list ? Object.values(draft.list).at(-1).onPage : 0
        draft.pagination.endsWith = draft.totalPages < draft.pagination.step ? draft.totalPages : 7
        if (draft.list) goToPage(draft)
        break

      case "goToPage":
        draft.page = action.pageNo
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

  function goToPage(draft) {
    const pageParam = params.get("page")

    if (pageParam && parseInt(pageParam) > draft.totalPages) {
      params.set("page", draft.totalPages)
      setParams(params)
    } else if (pageParam && parseInt(pageParam) < 1) {
      params.set("page", 1)
      setParams(params)
    } else if (pageParam) {
      params.set("page", parseInt(pageParam))
      setParams(params)
    } else {
      const timestamp = new Date().getTime()

      const upNext = Object.entries(draft.list).reduce((prevValue, [currDate, currValue]) => {
        if (new Date(currDate).getTime() > timestamp) {
          return currValue
        } else {
          return prevValue
        }
      }, null)

      if (upNext) {
        upNext.scrolledTo = true
        params.set("page", upNext.onPage)
      } else {
        params.set("page", 1)
        setParams(params)
      }
    }
  }

  function handlePagination(action) {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0
    })
    dispatch({ type: "goToPage", pageNo: state.pagination.startsWith + i })
  }

  return (
    <>
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="card-title">Results</h2>
          <p className="lead">Below are listed games for the applied filters</p>
          <hr />
          {noParams && <div className="card-text">Submit the form to view the relevant games</div>}
          {gamesState.isFetching && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {!state.list && !noParams && !gamesState.isFetching && (
            <p className="card-text">There are no results for the selected parameters...</p>
          )}

          {!gamesState.isFetching && state.list && (
            <ul className="list-group list-group-flush">
              {Object.entries(state.list)
                .filter(([date, { onPage }]) => onPage === parseInt(params.get("page")))
                .map(dateCollection => {
                  const date = new Date(dateCollection[0])
                  const games = dateCollection[1].games

                  return (
                    <li key={dateCollection[0]} className="list-group-item d-flex">
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
                            <li key={game.id} className="list-group-item d-flex px-0">
                              {game.id}
                            </li>
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
      {state.list && (
        <nav className="pt-2">
          <ul className="pagination justify-content-center mt-4 mb-1">
            <li
              role={state.pagination.startsWith === 1 ? undefined : "button"}
              className={"page-item " + (state.pagination.startsWith === 1 ? "disabled" : "")}
            >
              <span className="page-link">Previous</span>
            </li>
            {Array.from(
              {
                length:
                  state.totalPages < state.pagination.step
                    ? state.totalPages
                    : state.pagination.step
              },
              (v, i) => (
                <li
                  role="button"
                  key={i}
                  className={
                    "page-item " + (parseInt(params.get("page")) === i + 1 ? "active" : "")
                  }
                  onClick={() => handlePagination(state.pagination.startsWith + i)}
                >
                  <span className="page-link">{state.pagination.startsWith + i}</span>
                </li>
              )
            )}
            <li
              role={state.pagination.endsWith === state.totalPages ? undefined : "button"}
              className={
                "page-item " + (state.pagination.endsWith === state.totalPages ? "disabled" : "")
              }
            >
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default GamesList
