import React, { createContext, useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"
import { AppDispatch } from "./AppProvider.jsx"

export const GamesState = createContext()

export const GamesDispatch = createContext()

function GamesProvider(props) {
  const appDispatch = useContext(AppDispatch)

  const initialState = {
    params: null,
    games: null,
    isFetching: false,
    error: null
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "fetchGames":
        draft.params = action.params
        draft.isFetching = true
        draft.error = null
        break

      case "updateGames":
        draft.games = action.games
        draft.isFetching = false
        break

      case "error":
        draft.isFetching = false
        draft.error = action.err
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const games = useGames(state.params, dispatch)

  useEffect(() => {
    if (games) dispatch({ type: "updateGames", games })
  }, [games])

  useEffect(() => {
    if (state.error) {
      appDispatch({
        type: "flashMessage",
        msg: {
          text: state.error,
          color: "danger"
        }
      })
    }
  }, [state.error])

  return (
    <GamesState.Provider value={state}>
      <GamesDispatch.Provider value={dispatch}>{props.children}</GamesDispatch.Provider>
    </GamesState.Provider>
  )
}

export default GamesProvider
