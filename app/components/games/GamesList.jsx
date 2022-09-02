import React, { useRef, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AppState } from "../../providers/AppProvider.jsx"

function GamesList({ list, params }) {
  const elementToScrollTo = useRef(null)

  const appState = useContext(AppState)

  useEffect(() => {
    if (elementToScrollTo.current) {
      elementToScrollTo.current.scrollIntoView({ behavior: "smooth" })
    }
  })

  return (
    <ul className="list-group list-group-flush">
      {Object.entries(list)
        .filter(([date, { onPage }]) => onPage === parseInt(params.get("page")))
        .map(dateCollection => {
          const date = new Date(dateCollection[0])
          const games = dateCollection[1].games

          return (
            <li
              ref={dateCollection[1].upNext ? elementToScrollTo : undefined}
              key={dateCollection[0]}
              className="list-group-item d-flex py-4"
            >
              <div className="col-3">
                <span className="lead">
                  {["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"][
                    date.getDay()
                  ] + ","}
                </span>
                <h4>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ][date.getMonth()] +
                    " " +
                    date.getDate() +
                    ", " +
                    date.getFullYear()}
                </h4>
                <small className="text-muted">{`${games.length} game${
                  games.length > 1 ? "s" : ""
                }`}</small>
              </div>
              <div className="col-9">
                <div className="row pt-2">
                  <h5 className="col-3">Time</h5>
                  <h5 className="col-6">Teams</h5>
                  <h5 className="col-3">Result</h5>
                </div>
                <hr className="mb-0" />
                <ul className="list-group list-group-flush">
                  {games.map(game => {
                    const homeTeam = appState.teams.find(team => team.id === game.home_team.id)

                    const visitorTeam = appState.teams.find(
                      team => team.id === game.visitor_team.id
                    )

                    return (
                      <li key={game.id} className="list-group-item px-0 py-3 row d-flex">
                        <div className="col-3">
                          {game.status.toUpperCase() === "FINAL" && <span>FINAL</span>}
                        </div>
                        <div className="col-6 vstack gap-3">
                          <div className="row align-items-center">
                            <span className="col-auto">@</span>
                            <div className="col-2 px-2">
                              <img
                                src={homeTeam.logo}
                                alt={`A logo of ${homeTeam.full_name}`}
                                className="img-fluid"
                              />
                            </div>
                            <h6 className="col mb-0">
                              <Link className="anchor" to={`/teams/${homeTeam.id}`}>
                                {homeTeam.full_name}
                              </Link>
                            </h6>
                          </div>
                          <div className="row align-items-center">
                            <span className="col-auto">vs</span>
                            <div className="col-2 px-2">
                              <img
                                src={visitorTeam.logo}
                                alt={`A logo of ${visitorTeam.full_name}`}
                                className="img-fluid"
                              />
                            </div>
                            <h6 className="col mb-0">
                              <Link className="anchor" to={`/teams/${visitorTeam.id}`}>
                                {visitorTeam.full_name}
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div className="col-3 d-flex flex-column justify-content-center gap-4">
                          <span
                            className={
                              game.home_team_score > game.visitor_team_score ? "fw-bold" : undefined
                            }
                          >
                            {game.home_team_score}
                          </span>
                          <span
                            className={
                              game.home_team_score < game.visitor_team_score ? "fw-bold" : undefined
                            }
                          >
                            {game.visitor_team_score}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          )
        })}
    </ul>
  )
}

export default GamesList
