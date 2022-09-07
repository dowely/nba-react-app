import { useState, useEffect } from "react"

function useStanding(games, teamId) {
  const [standing, setStanding] = useState(null)

  useEffect(() => {
    if (games && games.length > 0) {
      const standingData = {
        winsLosses: [0, 0],
        pct: undefined,
        home: [0, 0],
        away: [0, 0]
      }

      populateStanding(standingData)

      setStanding(standingData)
    } else if (games) {
      setStanding({})
    }
  }, [games])

  function populateStanding(standing) {
    for (const game of games.filter(game => !game.postseason)) {
      if (game.home_team.id === teamId) {
        //home game
        if (game.home_team_score > game.visitor_team_score) {
          //win
          standing.winsLosses[0] += 1
        } else {
          //loss
          standing.winsLosses[1] += 1
        }
      } else {
        //away game
        if (game.visitor_team_score > game.home_team_score) {
          //win
          standing.winsLosses[0] += 1
        } else {
          //loss
          standing.winsLosses[1] += 1
        }
      }
    }
    console.log(games)
    console.log(games.filter(game => game.postseason))
  }

  return standing
}

export default useStanding
