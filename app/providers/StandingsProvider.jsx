import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"
import useStandings from "../hooks/useStandings"

export const StandingsState = createContext()

export const StandingsDispatch = createContext()

function StandingsProvider({ children }) {
  const initialState = {
    standings: [],
    request: null,
    error: null
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "createTeamRecords":
        const newIds = action.ids.filter(
          id => !draft.standings.some(record => record.teamId === id)
        )

        const records = newIds.map(id => ({
          teamId: id,
          seasons: []
        }))

        draft.standings.push(...records)

        if (!draft.request) {
          draft.request = {
            per_page: 100,
            "team_ids[]": newIds,
            "seasons[]": [new Date().getFullYear()]
          }
        } else {
          draft.request["team_ids[]"].push(...newIds)
        }
        break

      case "noGamesYet":
        draft.request["seasons[]"] = [draft.request["seasons[]"][0] - 1]
        break

      case "insertStandings":
        action.standings.forEach(standing => {
          draft.standings.find(record => record.teamId === standing.id).seasons.push(standing)
        })
        draft.request = null
        break

      case "error":
        draft.error = action.error
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const games = useGames(state.request, dispatch)

  useEffect(() => {
    if (games && !games.length) {
      dispatch({ type: "noGamesYet" })
    }
  }, [games])

  const standings = useStandings(games, state.request && state.request["team_ids[]"])

  useEffect(() => {
    if (standings) {
      dispatch({ type: "insertStandings", standings })
    }
  }, [standings])

  useEffect(() => console.log("Standings request: ", state.request), [state.request])

  return (
    <StandingsState.Provider value={state}>
      <StandingsDispatch.Provider value={dispatch}>{children}</StandingsDispatch.Provider>
    </StandingsState.Provider>
  )
}

export default StandingsProvider
