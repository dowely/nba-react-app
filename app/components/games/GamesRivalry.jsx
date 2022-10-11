import React, { useContext } from "react"
import { AppState } from "../../providers/AppProvider.jsx"

function GamesRivalry({ list, rivalry }) {
  if (!rivalry || !list || !Object.keys(list).length) return

  if (
    !(
      rivalry.find(id => parseInt(id) === Object.values(list)[0].games[0].home_team.id) &&
      rivalry.find(id => parseInt(id) === Object.values(list)[0].games[0].visitor_team.id)
    )
  )
    return

  const appState = useContext(AppState)

  const range = parseTimeRange(list)

  const teamOne = appState.teams.find(team => team.id === parseInt(rivalry[0]))
  const teamTwo = appState.teams.find(team => team.id === parseInt(rivalry[1]))

  const leftSide = {
    id: teamOne.id,
    logo: teamOne.logo,
    name: teamOne.name,
    fullName: teamOne.full_name,
    wins: 0,
    ppg: 0
  }

  const rightSide = {
    id: teamTwo.id,
    logo: teamTwo.logo,
    name: teamTwo.name,
    fullName: teamTwo.full_name,
    wins: 0,
    ppg: 0
  }

  countWins(leftSide, rightSide)

  countPPG(leftSide, rightSide)

  function countPPG(teamOne, teamTwo) {
    let gamesCount = 0

    for (const date in list) {
      ;[teamOne, teamTwo].find(team => team.id === list[date].games[0].home_team.id).ppg +=
        list[date].games[0].home_team_score
      ;[teamOne, teamTwo].find(team => team.id === list[date].games[0].visitor_team.id).ppg +=
        list[date].games[0].visitor_team_score

      gamesCount++
    }

    teamOne.ppg = (teamOne.ppg / gamesCount).toFixed(1)
    teamTwo.ppg = (teamTwo.ppg / gamesCount).toFixed(1)
  }

  function countWins(teamOne, teamTwo) {
    for (const date in list) {
      if (list[date].games[0].home_team_score > list[date].games[0].visitor_team_score) {
        ;[teamOne, teamTwo].find(team => team.id === list[date].games[0].home_team.id).wins++
      } else {
        ;[teamOne, teamTwo].find(team => team.id === list[date].games[0].visitor_team.id).wins++
      }
    }
  }

  function parseTimeRange(games) {
    if (
      Object.keys(games).length < 2 ||
      new Date(Object.keys(games).at(0)).getFullYear() ===
        new Date(Object.keys(games).at(-1)).getFullYear()
    ) {
      return `in ${new Date(Object.keys(games)[0]).getFullYear()}`
    } else {
      return (
        <>
          <span>throughout&#32;</span>
          <span className="text-nowrap">{`${new Date(
            Object.keys(games).at(-1)
          ).getFullYear()} - ${new Date(Object.keys(games).at(0)).getFullYear()}`}</span>
        </>
      )
    }
  }

  return (
    <div className="card col-lg-9 mt-5">
      <div className="card-header hstack gap-5 mb-sm-3">
        <h2 className="mb-0">Rivalry</h2>
        <div className="fs-4 fw-light ms-auto align-self-center text-end">{range}</div>
      </div>
      <div className="card-body row">
        <div className="col-5 col-sm-12">
          <div className="row">
            <h3 className="col-12 col-sm-5 order-sm-4 text-center mt-0 mt-sm-3 mb-3 mb-sm-4">
              <span className="d-sm-none text-nowrap">{leftSide.fullName}</span>
              <span className="d-none d-sm-inline">{leftSide.fullName}</span>
            </h3>
            <div className="col-12 col-sm-5 order-sm-1">
              <div className="col-9 mx-auto text-center">
                <img className="img-fluid" src={leftSide.logo} alt={`A ${leftSide.name} logo`} />
              </div>
            </div>
            <span className="col-12 col-sm-2 order-sm-2 text-center align-self-center display-6 my-2 my-sm-0">
              vs
            </span>
            <div className="col-12 col-sm-5 order-sm-3">
              <div className="col-9 mx-auto text-center">
                <img className="img-fluid" src={rightSide.logo} alt={`A ${rightSide.name} logo`} />
              </div>
            </div>
            <h3 className="col-12 col-sm-5 order-sm-5 ms-sm-auto text-center mt-3 mb-0 mb-sm-4">
              <span className="d-sm-none text-nowrap">{rightSide.fullName}</span>
              <span className="d-none d-sm-inline">{rightSide.fullName}</span>
            </h3>
          </div>
        </div>
        <div className="col-3 col-sm-12">
          <div className="row h-100 align-content-center">
            <h3 className="col-12 col-sm-5 text-center my-1">{leftSide.wins}</h3>
            <span className="col-12 col-sm-2 text-center align-self-sm-center h4 my-4 my-sm-1">
              wins
            </span>
            <h3 className="col-12 col-sm-5 text-center my-1">{rightSide.wins}</h3>
          </div>
        </div>
        <div className="col-4 col-sm-12">
          <div className="row h-100 align-content-center">
            <h3 className="col-12 col-sm-5 text-center my-1">{leftSide.ppg}</h3>
            <span className="col-12 col-sm-2 text-center align-self-center h4 my-4 my-sm-1">
              PPG
            </span>
            <h3 className="col-12 col-sm-5 text-center my-1">{rightSide.ppg}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesRivalry
