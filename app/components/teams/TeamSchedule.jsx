import React, { useState, useEffect, useContext } from "react"
import { GamesState, GamesDispatch } from "../../providers/GamesProvider.jsx"

function TeamSchedule({ team }) {
  const gamesState = useContext(GamesState)
  const gamesDispatch = useContext(GamesDispatch)

  const [games, setGames] = useState()

  useEffect(() => {
    if (!gamesState.games) {
      gamesDispatch({
        type: "fetchGames",
        params: {
          per_page: 100,
          "team_ids[]": [team.id],
          "seasons[]": [new Date().getFullYear()]
        }
      })
    } else if (!gamesState.games.length) {
      gamesDispatch({
        type: "fetchGames",
        params: {
          per_page: 100,
          "team_ids[]": [team.id],
          "seasons[]": [new Date().getFullYear() - 1]
        }
      })
    } else {
      setGames(gamesState.games)
    }
  }, [gamesState.games])

  return (
    <div className="card">
      <ul className="list-group">
        {games &&
          games.map((game, index) => (
            <li key={index} className="list-group-item">
              {game.id}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TeamSchedule
