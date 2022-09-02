import React, { useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { GamesState } from "../../providers/GamesProvider.jsx"
import { parseSearchParams } from "../../helpers.js"

import GamesList from "./GamesList.jsx"
import GamesNav from "./GamesNav.jsx"

function GamesResults({ params, setParams }) {
  const gamesState = useContext(GamesState)

  const noParams = !Boolean(Array.from(params.keys()).length)

  const initialState = {
    list: null,
    pagination: {
      totalPages: null,
      gamesPerPage: 100
    },
    nav: {
      maxSpan: 7,
      startsWith: null,
      endsWith: null
    },
    scrolledToBottom: 0
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "populateList":
        draft.list = formatGames(action.games, draft.pagination.gamesPerPage)

        draft.pagination.totalPages = Boolean(Object.keys(draft.list).length)
          ? Object.values(draft.list).at(-1).onPage
          : 0

        return

      case "updateNav":
        draft.nav.startsWith = draft.nav.endsWith = parseInt(params.get("page"))

        function reachTheLimits(side) {
          const span = draft.nav.endsWith - draft.nav.startsWith + 1

          if (span === draft.pagination.totalPages || span === draft.nav.maxSpan) return

          if (side > 0 && draft.nav.endsWith < draft.pagination.totalPages) {
            draft.nav.endsWith++
          } else if (side < 0 && draft.nav.startsWith > 1) {
            draft.nav.startsWith--
          }

          if (action.value === "start" && draft.nav.endsWith < draft.pagination.totalPages) {
            reachTheLimits(1)
          } else if (action.value === "end" && draft.nav.startsWith > 1) {
            reachTheLimits(-1)
          } else {
            reachTheLimits(-side)
          }
        }

        reachTheLimits(action.value === "end" ? -1 : 1)

        return

      case "localize":
        draft.list[action.date].upNext = true
        return

      case "scrollToBottom":
        draft.scrolledToBottom++
        return
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (gamesState.games) {
      dispatch({
        type: "populateList",
        games: gamesState.games
      })
    }
  }, [gamesState.games])

  useEffect(() => {
    if (state.list) {
      adjustParams()

      if (state.pagination.totalPages > 0) {
        dispatch({ type: "updateNav", value: "middle" })
      }
    }
  }, [state.list])

  useEffect(() => {
    if (state.scrolledToBottom) {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0
      })
    }
  }, [state.scrolledToBottom])

  function formatGames(rawGames, gamesPerPage) {
    if (!rawGames.length) return {}

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

  function adjustParams() {
    const query = parseSearchParams(params)

    if (state.pagination.totalPages === 0) {
      setParams(query)
      return
    }

    const pageParam = params.get("page")

    if (pageParam && parseInt(pageParam) > state.pagination.totalPages) {
      query.page = state.pagination.totalPages
    } else if (pageParam && parseInt(pageParam) < 1) {
      query.page = 1
    } else if (pageParam) {
      query.page = parseInt(pageParam)
    }

    const timestamp = new Date("2022-01-07").getTime()

    const upNext = Object.entries(state.list).reduce((prevValue, currValue) => {
      if (new Date(currValue[0]).getTime() > timestamp) {
        return currValue
      } else {
        return prevValue
      }
    }, null)

    if (query.page && upNext) {
      if (query.page === upNext[1].onPage) {
        dispatch({ type: "localize", date: upNext[0] })
      }
    } else if (upNext) {
      query.page = upNext[1].onPage

      dispatch({ type: "localize", date: upNext[0] })
    } else if (!query.page) {
      query.page = 1
    }

    setParams(query)
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
          {!gamesState.isFetching &&
            !Boolean(state.list && Object.keys(state.list).length) &&
            !noParams && (
              <p className="card-text">There are no results for the selected parameters...</p>
            )}
          {!gamesState.isFetching && Boolean(state.list && Object.keys(state.list).length) && (
            <GamesList list={state.list} params={params} />
          )}
        </div>
      </div>
      {!gamesState.isFetching && Boolean(state.list && Object.keys(state.list).length) && (
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
