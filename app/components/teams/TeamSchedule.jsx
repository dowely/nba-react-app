import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { GamesState, GamesDispatch } from "../../providers/GamesProvider.jsx"
import { AppState } from "../../providers/AppProvider.jsx"

function TeamSchedule({ team }) {
  const gamesState = useContext(GamesState)
  const gamesDispatch = useContext(GamesDispatch)

  const appState = useContext(AppState)

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

  useEffect(() => {
    if (games && games.length) {
      gamesDispatch({
        type: "fetchGames",
        params: {
          per_page: 100,
          "team_ids[]": [team.id],
          "seasons[]": [new Date(games.at(-1).date).getFullYear()]
        }
      })
    }
  }, [team])

  function generateList() {
    const regularSeason = games
      .filter(game => !game.postseason)
      .reverse()
      .map(game => (
        <li key={game.id} className="list-group-item">
          {generateGameItem(game)}
        </li>
      ))

    regularSeason.unshift(
      <li key="regular" className="list-group-item list-group-item-primary">
        Regular Season
      </li>
    )

    const postSeason = games
      .filter(game => game.postseason)
      .reverse()
      .map(game => (
        <li key={game.id} className="list-group-item">
          {generateGameItem(game)}
        </li>
      ))

    if (postSeason.length)
      postSeason.unshift(
        <li key="postSeason" className="list-group-item list-group-item-primary">
          Postseason
        </li>
      )

    return <ul className="list-group list-group-flush">{regularSeason.concat(postSeason)}</ul>
  }

  function generateGameItem(game) {
    const date = new Date(game.date)

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]

    const opponent =
      game.home_team.id === team.id
        ? appState.teams.find(team => team.id === game.visitor_team.id)
        : appState.teams.find(team => team.id === game.home_team.id)

    const homeGame = game.home_team.id === team.id ? true : false

    let status

    if (game.status === "Final") {
      const score = [game.home_team_score, game.visitor_team_score]
        .sort((a, b) => b - a)
        .join(" - ")

      const win =
        (homeGame && game.home_team_score > game.visitor_team_score) ||
        (!homeGame && game.visitor_team_score > game.home_team_score)

      status = (
        <p className="col-6 col-xl-3 mb-0 px-0 text-center">
          {win ? <span className="text-success">W</span> : <span className="text-danger">L</span>}
          &nbsp;&nbsp;
          {score}
        </p>
      )
    } else {
      status = (
        <p className="col-6 col-xl-2 mb-0 px-0 text-center border border-secondary border-opacity-50">
          {game.status}
        </p>
      )
    }

    return (
      <div className="row gy-3 py-1 align-items-center">
        <p className="col-5 col-xl-2 mb-0 text-center text-xl-start px-0 ps-xl-3">
          {`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`}
        </p>
        <div className="col-2 col-xl-1 px-0">
          <img src={opponent.logo} alt={`A logo of ${opponent.name}`} className="img-fluid" />
        </div>
        <h6 className="col-5 col-xl-4 px-0 ps-xl-4 mb-0 text-center text-xl-start">
          <Link className="anchor" to={`/teams/${opponent.id}`}>
            <span className="d-xl-none">{opponent.name}</span>
            <span className="d-none d-xl-inline-block">{opponent.full_name}</span>
          </Link>
        </h6>
        <p className="col-3 col-xl-1 mb-0 px-0 text-end text-xl-start small">
          {homeGame ? "Home" : "Away"}
        </p>
        {status}
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="mb-0">Schedule</h3>
        <h3 className="mb-0">
          {games &&
            (() => {
              const season = games[0].season

              return `${season} - ${(season + 1).toString().substring(2)}`
            })()}
        </h3>
      </div>
      {!games && (
        <div className="text-center my-5">
          <div
            className="spinner-grow text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {games && generateList()}
    </div>
  )
}

export default TeamSchedule
