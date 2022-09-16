import React, { useEffect, createContext } from "react"
import { useImmerReducer } from "use-immer"
import useTeams from "../hooks/useTeams.js"
import intros from "./intros.json"

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
        logo: "/logos/Lakers.gif",
        intro: {
          text: "Lorem ipsum...",
          url: "https://en.wikipedia.org/wiki/Los_Angeles_Lakers"
        }
      }
    ],
    followedTeams: localStorage.getItem("followed_teams"),
    flashMessages: []
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "loadTeams":
        draft.teams = action.teams.map(team => {
          const introRecord = intros.find(record => record.id === team.id)

          return {
            ...team,
            logo: logos[team.name],
            intro: {
              text: introRecord.intro,
              url: introRecord.url
            }
          }
        })
        break

      case "toggleFollow":
        if (draft.followedTeams) {
          const arr = JSON.parse(draft.followedTeams)
          if (arr.includes(action.teamId) && arr.length === 1) {
            draft.followedTeams = null
          } else if (arr.includes(action.teamId)) {
            arr.splice(arr.indexOf(action.teamId), 1)
            draft.followedTeams = JSON.stringify(arr)
          } else {
            arr.push(action.teamId)
            draft.followedTeams = JSON.stringify(arr)
          }
        } else {
          draft.followedTeams = `[${action.teamId}]`
        }
        break

      case "flashMessage":
        draft.flashMessages.push(action.msg)
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const teams = useTeams()

  useEffect(() => {
    if (teams) dispatch({ type: "loadTeams", teams })
  }, [teams])

  useEffect(() => {
    if (state.followedTeams) {
      localStorage.setItem("followed_teams", state.followedTeams)
    } else {
      localStorage.removeItem("followed_teams")
    }
  }, [state.followedTeams])

  return (
    <AppState.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>{props.children}</AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default AppProvider
