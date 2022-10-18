import React, { useState, useEffect, useContext } from "react"
import { GamesState } from "../../providers/GamesProvider.jsx"
import GameCard from "../GameCard.jsx"

function TeamFixtures({ team }) {
  const gamesState = useContext(GamesState)

  const [prevGame, setPrevGame] = useState()
  const [nextGame, setNextGame] = useState()

  useEffect(() => {
    if (gamesState.games && gamesState.games.length) {
      let prev = {}
      let next = {}

      gamesState.games.forEach(game => {
        if (game.status === "Final" && !Object.keys(prev).length) prev = game
        if (
          game.status !== "Final" &&
          new Date(game.date).getTime() + 8.64e7 > new Date().getTime()
        )
          next = game
      })

      setPrevGame(prev)
      setNextGame(next)
    }
  }, [gamesState.games])

  useEffect(() => {
    if (prevGame) {
      setPrevGame()
      setNextGame()
    }
  }, [team])

  return (
    <section>
      <h2 className="text-center mt-3 mt-lg-5">Fixtures & Results</h2>
      <hr className="w-25 mx-auto my-3 my-xl-4" />
      <div className="row">
        <div>
          <h4 className="text-center text-primary fw-normal mb-3 mb-xl-4">Previous Game</h4>
          <GameCard game={prevGame} />
        </div>
        <div className="mt-4 mb-5">
          <h4 className="text-center text-primary fw-normal mb-3 mb-xl-4">Next Game</h4>
          <GameCard game={nextGame} />
        </div>
      </div>
    </section>
  )
}

export default TeamFixtures
