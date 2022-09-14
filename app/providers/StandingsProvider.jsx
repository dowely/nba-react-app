import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"
import useStandings from "../hooks/useStandings"

export const StandingsState = createContext()

export const StandingsDispatch = createContext()

function StandingsProvider({ children }) {
  const initialState = {
    standings: [],
    seasonGames: null,
    request: null,
    isFetching: false,
    error: null
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "createTeamRecords":
        const records = action.ids.map(id => ({
          teamId: id,
          seasons: []
        }))

        draft.standings.push(...records)

        draft.request = {
          per_page: 100,
          "team_ids[]": action.ids,
          "seasons[]": [new Date().getFullYear()]
        }

        draft.isFetching = true
        break

      case "noGamesYet":
        draft.request["seasons[]"] = [draft.request["seasons[]"][0] - 1]
        break

      case "loadGames":
        draft.seasonGames = action.games
        break

      case "error":
        draft.isFetching = false
        draft.error = action.error
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const games = useGames(state.request, dispatch)

  useEffect(() => {
    if (games && games.length) {
      dispatch({ type: "loadGames", games })
    } else if (games) {
      dispatch({ type: "noGamesYet" })
    }
  }, [games])

  const standing = useStandings(state.seasonGames, [12])

  return (
    <StandingsState.Provider value={state}>
      <StandingsDispatch.Provider value={dispatch}>{children}</StandingsDispatch.Provider>
    </StandingsState.Provider>
  )
}

export default StandingsProvider
