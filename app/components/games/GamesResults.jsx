import React, { useEffect, useContext } from "react"

import { useImmerReducer } from "use-immer"
import { GamesState } from "../../providers/GamesProvider.jsx"

import GamesList from "./GamesList.jsx"
import GamesNav from "./GamesNav.jsx"

function GamesResults({ params, setParams }) {
  const gamesState = useContext(GamesState)

  const noParams = !Boolean(Array.from(params.keys()).length)

  const initialState = {
    list: null,
    pagination: {
      totalPages: 0,
      gamesPerPage: 100
    },
    nav: {
      maxSpan: 7,
      startsWith: 1,
      endsWith: 1
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "populateList":
        draft.list = formatGames(action.games, draft.pagination.gamesPerPage)
        break

      case "updatePagination":
        draft.pagination.totalPages = action.list ? Object.values(action.list).at(-1).onPage : 0
        break

      case "updateNav":
        if (action.value === "sync") {
          let i = 0

          while (
            draft.nav.startsWith - 1 > 0 &&
            draft.nav.endsWith + 1 - draft.nav.startsWith < draft.nav.maxSpan &&
            draft.nav.endsWith < draft.pagination.totalPages
          ) {
            if (i % 2) draft.nav.endsWith++
            else draft.nav.startsWith--
            i++
          }
        }
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

  useEffect(() => {
    dispatch({
      type: "updatePagination",
      list: state.list
    })
  }, [state.list])

  useEffect(() => {
    if (state.pagination.totalPages > 0) {
      goToPage()

      dispatch({
        type: "updateNav",
        value: "sync"
      })
    }
  }, [state.pagination])

  function formatGames(rawGames, gamesPerPage) {
    if (!rawGames.length) return null

    const list = {}
    let count = 1

    for (const game of rawGames) {
      const date = game.date.substring(0, game.date.indexOf("T"))

      if (date in list) {
        list[date].games.push(game)
        list[date].onPage = Math.floor(count / gamesPerPage) + 1
      } else {
        list[date] = {
          games: [game],
          onPage: Math.floor(count / gamesPerPage) + 1
        }
      }
      count++
    }

    return list
  }

  function goToPage() {
    const pageParam = params.get("page")

    if (pageParam && parseInt(pageParam) > state.pagination.totalPages) {
      params.set("page", state.pagination.totalPages)
      setParams(params)
    } else if (pageParam && parseInt(pageParam) < 1) {
      params.set("page", 1)
      setParams(params)
    } else if (pageParam) {
      params.set("page", parseInt(pageParam))
      setParams(params)
    } else {
      const timestamp = new Date().getTime()

      const upNext = Object.entries(state.list).reduce((prevValue, [currDate, currValue]) => {
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

          {!gamesState.isFetching && !state.list && !noParams && (
            <p className="card-text">There are no results for the selected parameters...</p>
          )}
          {!gamesState.isFetching && state.list && <GamesList list={state.list} params={params} />}
        </div>
      </div>
      {!gamesState.isFetching && state.list && (
        <GamesNav
          nav={state.nav}
          pagination={state.pagination}
          params={params}
          setParams={setParams}
          dispatch={dispatch}
        />
      )}
    </>
  )
}

export default GamesResults
