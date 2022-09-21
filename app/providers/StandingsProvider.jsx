import React, { useEffect, useContext, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"
import useStandings from "../hooks/useStandings"
import { AppDispatch } from "../providers/AppProvider.jsx"

export const StandingsState = createContext()

export const StandingsDispatch = createContext()

function StandingsProvider({ children }) {
  const appDispatch = useContext(AppDispatch)

  const initialState = {
    standings: [],
    request: null,
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
        break

      case "createSeasonRecord":
        draft.request = {
          per_page: 100,
          "team_ids[]": [action.teamId],
          "seasons[]": [action.season]
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

  //useEffect(() => console.log("Standings request: ", state.request), [state.request])

  return (
    <StandingsState.Provider value={state}>
      <StandingsDispatch.Provider value={dispatch}>{children}</StandingsDispatch.Provider>
    </StandingsState.Provider>
  )
}

export default StandingsProvider
