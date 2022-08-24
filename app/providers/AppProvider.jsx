import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useTeams from "../hooks/useTeams.js"

const logos = {}

function importAll(r) {
  r.keys().forEach(key => (logos[key.slice(2, -4)] = r(key)))
}

importAll(require.context("../images", false, /\.gif$/))

export const AppState = createContext()

export const AppDispatch = createContext()

function AppProvider(props) {
  const initialState = {
    teams: [
      {
        id: 14,
        abbreviation: "LAL",
        city: "Los Angeles",
        conference: "West",
        division: "Pacific",
        full_name: "Los Angeles Lakers",
        name: "Lakers",
        logo: "/logos/Lakers.gif"
      }
    ]
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "loadTeams":
        draft.teams = action.teams.map(team => {
          return { ...team, logo: logos[team.name] }
        })
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const teams = useTeams()

  useEffect(() => {
    if (teams) dispatch({ type: "loadTeams", teams })
  }, [teams])

  return (
    <AppState.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>{props.children}</AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default AppProvider
