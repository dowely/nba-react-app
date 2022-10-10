import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AppState } from "../providers/AppProvider.jsx"
import { AiOutlineEye } from "react-icons/ai"
import WatchBtn from "./WatchBtn.jsx"

function GameCard({ game }) {
  const appState = useContext(AppState)

  const followed = JSON.parse(appState.followedTeams) || []

  const [teams, setTeams] = useState(game && Object.keys(game).length && teamsArr())

  useEffect(() => {
    if (game && Object.keys(game).length) {
      setTeams(teamsArr())
    }
  }, [game])

  function teamsArr() {
    return [
      appState.teams.find(team => team.id === game.home_team.id),
      appState.teams.find(team => team.id === game.visitor_team.id)
    ]
  }

  function renderCard() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]

    const months = [
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
    ]

    const date = new Date(game.date)

    const tags = {
      left: [],
      right: []
    }

    if (teams.every(team => followed.find(id => id === team.id)))
      tags.left.push(
        <span key="topPick" className="badge text-bg-danger d-table-cell m-1 pt-1">
          Top Pick
        </span>
      )

    if (game.status.indexOf(":") > -1)
      tags.left.push(
        <WatchBtn
          key="watchBtn"
          className="badge text-bg-primary fs-5 d-flex m-1"
          style={{
            width: "fit-content",
            "--bs-badge-padding-x": "0.1em",
            "--bs-badge-padding-y": "0.01em"
          }}
          gameId={game.id}
        />
      )

    if (game.postseason)
      tags.right.push(
        <span key="postseason" className="badge text-bg-dark d-table-cell m-1 pt-1">
          Postseason
        </span>
      )

    tags.right.push(
      ...Array.from(
        new Set([
          game.home_team.conference,
          game.visitor_team.conference,
          game.home_team.division,
          game.visitor_team.division
        ])
      ).map(tag => (
        <span key={tag} className="badge text-bg-dark d-table-cell m-1 pt-1">
          {tag}
        </span>
      ))
    )

    return (
      <>
        <h5 className="card-header text-center">
          <span className="lead">{days[date.getDay()] + ", "}</span>
          {months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}
        </h5>
        <div className="card-body">
          <div className="row py-xl-3 gy-2 gy-md-3 gy-xl-4 align-items-center justify-content-xl-center">
            <div className="col-3 px-0 text-center col-xl-4 ord-1">
              <img src={teams[0].logo} alt={`A ${teams[0].name} logo`} className="img-fluid" />
            </div>
            <h5 className="col-7 mb-0 col-xl-4 ord-6 text-xl-center px-xl-0 ps-xl-2">
              <Link className="anchor" to={`/teams/${teams[0].id}`}>
                {teams[0].full_name}
              </Link>
            </h5>
            <h5
              className={
                "col-2 px-0 mb-0 text-center col-xl-1 ord-2 fs-larger " +
                (game.status.indexOf(":") > -1
                  ? "fw-light text-muted"
                  : game.home_team_score < game.visitor_team_score
                  ? "fw-light"
                  : "fw-bold")
              }
            >
              {game.home_team_score}
            </h5>
            <span className="col-3 text-center col-xl-2 ord-7 mx-xl-auto">VS</span>
            <div className="col-5 offset-4 col-md-4 offset-md-5 col-lg-5 offset-lg-4 text-center offset-xl-0 col-xl-2 ord-3 px-sm-5 px-lg-4 px-xl-2">
              {game.status.indexOf(":") === -1 && <span className="d-none d-xl-inline">:</span>}
              {game.status.indexOf(":") > -1 && (
                <p className="border mb-0 px-xl-3">{game.status}</p>
              )}
            </div>
            <div className="col-3 px-0 text-center col-xl-4 ord-5">
              <img src={teams[1].logo} alt={`A ${teams[1].name} logo`} className="img-fluid" />
            </div>
            <h5 className="col-7 mb-0 col-xl-4 ord-8 text-xl-center px-xl-0 pe-xl-2">
              <Link className="anchor" to={`/teams/${teams[1].id}`}>
                {teams[1].full_name}
              </Link>
            </h5>
            <h5
              className={
                "col-2 px-0 mb-0 text-center col-xl-1 ord-4 fs-larger " +
                (game.status.indexOf(":") > -1
                  ? "fw-light text-muted"
                  : game.home_team_score > game.visitor_team_score
                  ? "fw-light"
                  : "fw-bold")
              }
            >
              {game.visitor_team_score}
            </h5>
          </div>
        </div>
        <div className="card-footer">
          <div className="row px-2 align-items-start">
            <div className="col-4 px-0 d-flex flex-wrap">{tags.left}</div>
            <div className="col-7 offset-1 px-0 d-flex flex-row-reverse flex-wrap">
              {tags.right}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="card">
      {!game && (
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
      {game && !Object.keys(game).length && (
        <div className="card-body">
          <h5 className="card-title">No game to display yet</h5>
          <p className="card-text">
            Information about this game will show as soon as the new data is available.
          </p>
        </div>
      )}
      {game && teams && renderCard()}
    </div>
  )
}

export default GameCard
