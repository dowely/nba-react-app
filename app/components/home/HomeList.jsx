import React, { useState, useEffect, useContext, useMemo } from "react"
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

  const [games, setGames] = useState()

  const list = useMemo(() => generateList(gamesState.games), [gamesState.games])

  const [filter, setFilter] = useState("past")

  useEffect(() => {
    if (appState.followedTeams) {
      setParams(prev => ({ ...prev, "team_ids[]": JSON.parse(appState.followedTeams) }))
    } else setGames({})
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
      const games = {
        past: <p className="lead text-center">No games have been played yet</p>,
        future: <p className="lead text-center">All games have been played already</p>
      }

      const past = gamesState.games.filter(
        game => new Date(game.date).getTime() < new Date().getTime() || game.status === "Final"
      )

      const future = gamesState.games
        .filter(
          game => new Date(game.date).getTime() >= new Date().getTime() && game.status !== "Final"
        )
        .slice()
        .reverse()

      if (past.length)
        games.past = (
          <div className="vstack gap-4">
            {past.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )

      if (future.length)
        games.future = (
          <div className="vstack gap-4">
            {future.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )

      setGames(games)
    } else if (gamesState.games) {
      setParams(prev => ({ ...prev, "seasons[]": [new Date().getFullYear() - 1] }))
    }
  }, [gamesState.games])

  function generateList(games) {
    if (games && games.length) {
      const list = {
        past: <p className="lead text-center">No games have been played yet</p>,
        future: <p className="lead text-center">All games have been played already</p>
      }

      const pastGames = games.filter(
        game => new Date(game.date).getTime() < new Date().getTime() || game.status === "Final"
      )

      const futureGames = games
        .filter(
          game => new Date(game.date).getTime() >= new Date().getTime() && game.status !== "Final"
        )
        .slice()
        .reverse()

      if (pastGames.length)
        list.past = (
          <div className="vstack gap-4">
            {pastGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )

      if (futureGames.length)
        list.future = (
          <div className="vstack gap-4">
            {futureGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )

      return list
    } else return
  }

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
      <p className="lead text-center">Season 2021/22</p>
      <div className="hstack gap-3 justify-content-center mb-3">
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
          <label className="form-check-label text-primary" htmlFor="played">
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
          <label className="form-check-label text-primary" htmlFor="toBePlayed">
            To be played
          </label>
        </div>
      </div>
      {list[filter]}
    </>
  )
}

export default HomeList
