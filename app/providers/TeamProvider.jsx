import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useGames from "../hooks/useGames"
import useStanding from "../hooks/useStanding"

export const TeamState = createContext()

export const TeamDispatch = createContext()

function TeamProvider({ children, team }) {
  const initialState = {
    team, // api schema plus logo
    standings: [],
    request: {
      per_page: 100,
      "team_ids[]": [team.id],
      "seasons[]": [new Date().getFullYear()]
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "noStanding":
        draft.request["seasons[]"][0] -= 1
        break

      case "insertStanding":
        draft.standings.push(action.standing)
        break

      case "requestStanding":
        //draft.request['seasons[]'][0] = [action.season]
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const standing = useStanding(useGames(state.request), team.id, state.request["seasons[]"][0])

  useEffect(() => {
    if (standing && Object.keys(standing).length > 0) {
      dispatch({ type: "insertStanding", standing })
    } else if (standing) {
      dispatch({ type: "noStanding" })
    }
  }, [standing])

  return (
    <TeamState.Provider value={state}>
      <TeamDispatch.Provider value={dispatch}>{children}</TeamDispatch.Provider>
    </TeamState.Provider>
  )
}

export default TeamProvider
