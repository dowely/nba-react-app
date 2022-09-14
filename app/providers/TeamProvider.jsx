import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useStandings from "../hooks/useStandings"

export const TeamState = createContext()

export const TeamDispatch = createContext()

function TeamProvider({ children, games, team }) {
  const initialState = {
    team, // api schema plus logo
    standings: []
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "insertStanding":
        if (!draft.standings.find(std => std.season === action.standing.season)) {
          draft.standings.push(action.standing)
        }
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const standing = useStandings(games, team.id)

  useEffect(() => {
    if (standing) {
      dispatch({ type: "insertStanding", standing })
    }
  }, [standing])

  return (
    <TeamState.Provider value={state}>
      <TeamDispatch.Provider value={dispatch}>{children}</TeamDispatch.Provider>
    </TeamState.Provider>
  )
}

export default TeamProvider
