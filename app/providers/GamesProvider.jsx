import React, { createContext, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"

export const GamesState = createContext()

export const GamesDispatch = createContext()

function GamesProvider(props) {
  const initialState = {
    params: {
      seasons: [new Date().getFullYear() - 1],
      per_page: 100
    },
    games: [],
    isFetching: true
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "fetchGames":
        draft.params = action.params
        draft.isFetching = true
        break

      case "updateGames":
        draft.games = action.games
        draft.isFetching = false
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const games = useGames(state.params)

  useEffect(() => {
    if (games) dispatch({ type: "updateGames", games })
  }, [games])

  return (
    <GamesState.Provider value={state}>
      <GamesDispatch.Provider value={dispatch}>{props.children}</GamesDispatch.Provider>
    </GamesState.Provider>
  )
}

export default GamesProvider