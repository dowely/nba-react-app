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
      totalPages: 0,
      gamesPerPage: 100
    },
    nav: {
      maxSpan: 7,
      startsWith: null,
      endsWith: null
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "populateList":
        draft.list = formatGames(action.games, draft.pagination.gamesPerPage)

        draft.pagination.totalPages = Boolean(Object.keys(draft.list).length)
          ? Object.values(draft.list).at(-1).onPage
          : 0

        if (draft.pagination.totalPages === 0) {
          draft.nav.startsWith = draft.nav.endsWith = 0
        } else {
          const pageParam = goToPage(draft)

          draft.nav.startsWith = draft.nav.endsWith = pageParam

          function reachTheLimits(side) {
            const span = draft.nav.endsWith - draft.nav.startsWith + 1

            if (span === draft.pagination.totalPages || span === draft.nav.maxSpan) return

            if (side > 0 && draft.nav.endsWith < draft.pagination.totalPages) {
              draft.nav.endsWith++
            } else if (side < 0 && draft.nav.startsWith > 1) {
              draft.nav.startsWith--
            }

            reachTheLimits(-side)
          }

          reachTheLimits(1)
        }

        return

      case "updatePagination":
        draft.pagination.totalPages = action.list ? Object.values(action.list).at(-1).onPage : 0
        return

      case "updateNav":
        if (draft.pagination.totalPages === 0) {
          draft.nav.startsWith = draft.nav.endsWith = null
          return
        } else if (action.value === "sync") {
          const pageParam = parseInt(params.get("page"))

          draft.nav.startsWith = draft.nav.endsWith = pageParam

          function reachTheLimits(side) {
            const span = draft.nav.endsWith - draft.nav.startsWith + 1

            if (span === draft.pagination.totalPages || span === draft.nav.maxSpan) return

            if (side > 0 && draft.nav.endsWith < draft.pagination.totalPages) {
              draft.nav.endsWith++
            } else if (side < 0 && draft.nav.startsWith > 1) {
              draft.nav.startsWith--
            }

            reachTheLimits(-side)
          }

          reachTheLimits(1)

          return
        }
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
    if (state.nav.startsWith === 0) {
      console.log("foo")
    }
  }, [state.nav.startsWith])
  /*
  useEffect(() => {
    dispatch({
      type: "updatePagination",
      list: state.list
    })
  }, [state.list])

  useEffect(() => {
    if (state.pagination.totalPages > 0) goToPage()

    dispatch({
      type: "updateNav",
      value: "sync"
    })
  }, [state.pagination])
*/
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

  function goToPage(draft) {
    const pageParam = params.get("page")

    const query = parseSearchParams(params)

    if (pageParam && parseInt(pageParam) > draft.pagination.totalPages) {
      //params.set("page", draft.pagination.totalPages)
      query.page = draft.pagination.totalPages
      //setParams(params)
      setParams(query)
    } else if (pageParam && parseInt(pageParam) < 1) {
      //params.set("page", 1)
      query.page = 1
      //setParams(params)
      setParams(query)
    } else if (pageParam) {
      query.page = parseInt(pageParam)
      setParams(query)
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
        //params.set("page", upNext.onPage)
        query.page = upNext.onPage
      } else {
        //params.set("page", 1)
        query.page = 1
      }
      setParams(query)
    }
    return parseInt(query.page)
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
