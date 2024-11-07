import React, { useState, useEffect, useContext } from "react"
import { AppState } from "../../providers/AppProvider.jsx"
import { GamesState, GamesDispatch } from "../../providers/GamesProvider.jsx"
import GameCard from "../GameCard.jsx"

function HomeList() {
  const appState = useContext(AppState)

  const gamesState = useContext(GamesState)
  const gamesDispatch = useContext(GamesDispatch)

  const [params, setParams] = useState({
    per_page: 100,
    "team_ids[]": JSON.parse(appState.followedTeams),
    "seasons[]": [new Date().getFullYear()]
  })

  const [list, setList] = useState()

  const [filter, setFilter] = useState("past")

  useEffect(() => {
    if (appState.followedTeams) {
      setParams(prev => ({ ...prev, "team_ids[]": JSON.parse(appState.followedTeams) }))
    } else setList({})
  }, [appState.followedTeams])

  useEffect(() => {
    if (params["team_ids[]"]) {
      gamesDispatch({
        type: "fetchGames",
        params
      })
    }
  }, [params])

  useEffect(() => {
    if (gamesState.games && gamesState.games.length) {
      const past = gamesState.games.filter(
        game =>
          new Date(game.date).getTime() + 8.64e7 < new Date().getTime() || game.status === "Final"
      )

      const future = gamesState.games
        .filter(
          game =>
            new Date(game.date).getTime() + 8.64e7 >= new Date().getTime() &&
            game.status !== "Final"
        )
        .slice()
        .reverse()

      setList({ past, future })
    } else if (gamesState.games) {
      setParams(prev => ({ ...prev, "seasons[]": [new Date().getFullYear() - 1] }))
    }
  }, [gamesState.games])

  return !list ? (
    <div className="text-center my-5">
      <div
        className="spinner-grow text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : Object.keys(list).length === 0 ? (
    <p className="lead text-center">Choose teams you want to follow to populate your feed</p>
  ) : (
    <>
      <p className="lead text-center mb-lg-4">
        Season {`${params["seasons[]"][0]}-${(params["seasons[]"][0] + 1).toString().substring(2)}`}
      </p>
      <div className="hstack gap-3 justify-content-center mb-3 mb-lg-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="playedOrNot"
            id="played"
            value="past"
            checked={filter === "past"}
            onChange={e => setFilter(e.target.value)}
          />
          <label role="button" className="form-check-label text-primary" htmlFor="played">
            Played
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="playedOrNot"
            id="toBePlayed"
            value="future"
            checked={filter === "future"}
            onChange={e => setFilter(e.target.value)}
          />
          <label role="button" className="form-check-label text-primary" htmlFor="toBePlayed">
            To be played
          </label>
        </div>
      </div>
      {list.past.length ? (
        <div className={"vstack gap-4 gap-md-5 " + (filter === "future" ? "d-none" : "")}>
          {list.past.map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </div>
      ) : (
        <p className={"lead text-center " + (filter === "future" ? "d-none" : "")}>
          No games have been played yet
        </p>
      )}
      {list.future.length ? (
        <div className={"vstack gap-4 gap-md-5 " + (filter === "past" ? "d-none" : "")}>
          {list.future.map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </div>
      ) : (
        <p className={"lead text-center " + (filter === "past" ? "d-none" : "")}>
          All games have been played already
        </p>
      )}
    </>
  )
}

export default HomeList
