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
    watchlist: localStorage.getItem("watchlist"),
    flashMessages: [],
    toast: {
      isVisible: false,
      data: null
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "loadTeams":
        draft.teams = action.teams.slice(0, 30).map(team => {
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

      case "toggleGameWatch":
        if (draft.watchlist) {
          const arr = JSON.parse(draft.watchlist)

          if (arr.includes(action.gameId)) {
            if (arr.length === 1) {
              draft.watchlist = null
            } else {
              arr.splice(arr.indexOf(action.gameId), 1)

              draft.watchlist = JSON.stringify(arr)
            }

            if (draft.toast.isVisible && draft.toast.data.gameId === action.gameId)
              draft.toast.isVisible = false
          } else {
            arr.push(action.gameId)

            draft.watchlist = JSON.stringify(arr)
          }
        } else {
          draft.watchlist = `[${action.gameId}]`
        }

        break

      case "removeGameWatch":
        const arr = JSON.parse(draft.watchlist)

        if (arr.length === 1) draft.watchlist = null
        else {
          arr.splice(arr.indexOf(action.gameId), 1)

          draft.watchlist = JSON.stringify(arr)
        }
        break

      case "toggleToast":
        if (draft.toast.isVisible && draft.toast.data.gameId === action.toastData.gameId) {
          draft.toast.isVisible = false
        } else if (draft.toast.isVisible) {
          draft.toast.data = action.toastData
        } else {
          draft.toast.data = action.toastData
          draft.toast.isVisible = true
        }
        break

      case "hideToast":
        draft.toast.isVisible = false
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

  useEffect(() => {
    if (state.watchlist) {
      localStorage.setItem("watchlist", state.watchlist)
    } else {
      localStorage.removeItem("watchlist")
    }
  }, [state.watchlist])

  return (
    <AppState.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>{props.children}</AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default AppProvider
