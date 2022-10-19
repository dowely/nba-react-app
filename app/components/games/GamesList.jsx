import React, { useRef, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AppState } from "../../providers/AppProvider.jsx"
import { AiOutlineEye } from "react-icons/ai"
import WatchBtn from "../WatchBtn.jsx"

function GamesList({ list, params }) {
  const elementToScrollTo = useRef(null)

  const appState = useContext(AppState)

  useEffect(() => {
    if (elementToScrollTo.current) {
      elementToScrollTo.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [list])

  return (
    <ul className="list-group list-group-flush">
      {Object.entries(list)
        .filter(([date, { onPage }]) => onPage === parseInt(params.get("page")))
        .map((dateCollection, index) => {
          const date = new Date(dateCollection[0])
          const games = dateCollection[1].games

          return (
            <li
              ref={dateCollection[1].upNext ? elementToScrollTo : undefined}
              key={dateCollection[0]}
              className={
                "list-group-item d-flex flex-column flex-xl-row py-0 py-sm-2 py-lg-3 py-xl-4 px-1 px-sm-3 " +
                (index > 0 ? "mt-3" : "")
              }
            >
              <div className="col-xl-3">
                <span className="lead">
                  {["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"][
                    date.getDay()
                  ] + ", "}
                </span>
                <h4 className="d-inline d-xl-block">
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
                <small className="text-muted d-block mb-2 mb-sm-4 mb-lg-5">{`${games.length} game${
                  games.length > 1 ? "s" : ""
                }`}</small>
              </div>
              <div className="col-xl-9">
                <div className="row pt-2">
                  <h5 className="d-none d-md-block col-md-3 mb-0 mb-xl-2">Time</h5>
                  <h5 className="col-8 col-md-6 mb-0 mb-xl-2">Teams</h5>
                  <h5 className="col-4 col-md-3 text-center text-md-start mb-0 mb-xl-2 px-md-3">
                    Result
                  </h5>
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
                        <div className="d-none d-md-block col-md-3">
                          {(game.status.toUpperCase() === "FINAL" && <span>FINAL</span>) || (
                            <span className={game.status.indexOf(":") > -1 ? "border p-1" : ""}>
                              {game.status}
                            </span>
                          )}
                          <br />
                          {game.status.indexOf(":") > -1 && (
                            <WatchBtn
                              className="mt-md-3 badge text-bg-primary fs-3 d-inline-flex align-items-center"
                              style={{
                                "--bs-badge-padding-x": "0.1em",
                                "--bs-badge-padding-y": "0.01em"
                              }}
                              gameId={game.id}
                            />
                          )}
                        </div>
                        <div className="col-8 col-md-6 vstack gap-3">
                          <div className="row align-items-center">
                            <span className="col-auto">@</span>
                            <div className="col-2 px-0 px-lg-2">
                              <img
                                src={homeTeam.logo}
                                alt={`A logo of ${homeTeam.full_name}`}
                                className="img-fluid"
                              />
                            </div>
                            <h6 className="col mb-0 pe-0">
                              <Link className="anchor" to={`/teams/${homeTeam.id}`}>
                                <span className="d-none d-sm-inline">{homeTeam.full_name}</span>
                                <span className="d-sm-none">{homeTeam.name}</span>
                              </Link>
                            </h6>
                          </div>
                          <div className="row align-items-center">
                            <span className="col-auto">vs</span>
                            <div className="col-2 px-0 px-lg-2">
                              <img
                                src={visitorTeam.logo}
                                alt={`A logo of ${visitorTeam.full_name}`}
                                className="img-fluid"
                              />
                            </div>
                            <h6 className="col mb-0 pe-0">
                              <Link className="anchor" to={`/teams/${visitorTeam.id}`}>
                                <span className="d-none d-sm-inline">{visitorTeam.full_name}</span>
                                <span className="d-sm-none">{visitorTeam.name}</span>
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div
                          className={
                            "col-4 col-md-3 d-flex flex-column justify-content-center align-items-center align-items-md-stretch px-0 px-md-3 " +
                            (game.status.indexOf(":") > -1
                              ? "gap-2 gap-sm-3 gap-md-4"
                              : "gap-3 gap-sm-4")
                          }
                        >
                          {game.status.indexOf(":") === -1 && (
                            <>
                              <span
                                className={
                                  game.home_team_score > game.visitor_team_score
                                    ? "fw-bold"
                                    : undefined
                                }
                              >
                                {game.home_team_score}
                              </span>
                              <span
                                className={
                                  game.home_team_score < game.visitor_team_score
                                    ? "fw-bold"
                                    : undefined
                                }
                              >
                                {game.visitor_team_score}
                              </span>
                            </>
                          )}
                          {game.status.indexOf(":") > -1 && (
                            <>
                              <span className="d-md-none border px-1">{game.status}</span>
                              <WatchBtn
                                className="d-md-none badge text-bg-primary fs-3 d-flex align-items-center"
                                style={{
                                  "--bs-badge-padding-x": "0.1em",
                                  "--bs-badge-padding-y": "0.01em"
                                }}
                                gameId={game.id}
                              />

                              <span className="d-none d-md-inline text-muted">
                                {game.home_team_score}
                              </span>
                              <span className="d-none d-md-inline text-muted">
                                {game.visitor_team_score}
                              </span>
                            </>
                          )}
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
