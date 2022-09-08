import { useState, useEffect } from "react"

function useStanding(games, teamId) {
  const [standing, setStanding] = useState(null)

  useEffect(() => {
    if (games && games.length > 0) {
      const standingData = {
        winsLosses: [0, 0],
        pct: 0,
        home: [0, 0],
        away: [0, 0],
        div: [0, 0],
        conf: [0, 0],
        east: [0, 0],
        atlantic: [0, 0],
        central: [0, 0],
        southeast: [0, 0],
        west: [0, 0],
        northwest: [0, 0],
        pacific: [0, 0],
        southwest: [0, 0],
        ppg: 0,
        oppg: 0,
        l10: [0, 0],
        strk: ""
      }

      populateStanding(standingData)

      setStanding(standingData)
    } else if (games) {
      setStanding({})
    }
  }, [games])

  function populateStanding(standing) {
    const regularSeasonGames = games
      .filter(game => !game.postseason)
      .filter((game, index) => index < 82) // regular season
      .filter(game => game.status === "Final")

    const strk = { type: undefined, count: 0 }

    for (const [i, game] of regularSeasonGames.entries()) {
      let index, opponentConf, opponentDiv

      if (game.home_team.id === teamId) {
        //home game
        opponentConf =
          game.visitor_team.conference.charAt(0).toLowerCase() +
          game.visitor_team.conference.slice(1)

        opponentDiv =
          game.visitor_team.division.charAt(0).toLowerCase() + game.visitor_team.division.slice(1)

        index = game.home_team_score > game.visitor_team_score ? 0 : 1 // win : loss

        standing.home[index] += 1

        standing.ppg += game.home_team_score

        standing.oppg += game.visitor_team_score
      } else {
        //away game
        opponentConf =
          game.home_team.conference.charAt(0).toLowerCase() + game.home_team.conference.slice(1)

        opponentDiv =
          game.home_team.division.charAt(0).toLowerCase() + game.home_team.division.slice(1)

        index = game.visitor_team_score > game.home_team_score ? 0 : 1 // win : loss

        standing.away[index] += 1

        standing.ppg += game.visitor_team_score

        standing.oppg += game.home_team_score
      }

      standing.winsLosses[index] += 1

      if (game.home_team.division === game.visitor_team.division) standing.div[index] += 1

      if (game.home_team.conference === game.visitor_team.conference) standing.conf[index] += 1

      standing[opponentConf][index] += 1

      standing[opponentDiv][index] += 1

      if (i < 10) standing.l10[index] += 1

      if (!strk.type) {
        strk.type = index ? "L" : "W"
        strk.count++
      } else if ((strk.type === "L" && index) || (strk.type === "W" && !index)) {
        strk.count++
      } else if (!standing.strk) {
        standing.strk = strk.type + strk.count.toString()
      }
    }

    if (regularSeasonGames.length) {
      standing.pct = (standing.winsLosses[0] / regularSeasonGames.length).toFixed(3)

      standing.ppg = (standing.ppg / regularSeasonGames.length).toFixed(1)

      standing.oppg = (standing.oppg / regularSeasonGames.length).toFixed(1)
    }
  }

  return standing
}

export default useStanding
