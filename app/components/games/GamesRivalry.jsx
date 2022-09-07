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
      return `throughout ${new Date(Object.keys(games).at(-1)).getFullYear()} - ${new Date(
        Object.keys(games).at(0)
      ).getFullYear()}`
    }
  }

  return (
    <div className="card col-lg-9 mt-4">
      <div className="card-header d-flex mb-3">
        <h2 className="mb-0">Rivalry</h2>
        <span className="fs-4 fw-light ms-auto align-self-center">{range}</span>
      </div>
      <div className="card-body row row-cols-3">
        <div className="col-5">
          <div className="w-50 mx-auto">
            <img src={leftSide.logo} alt={`A ${leftSide.name} logo`} />
          </div>
        </div>
        <span className="col-2 text-center align-self-center display-6">vs</span>
        <div className="col-5">
          <div className="w-50 mx-auto">
            <img src={rightSide.logo} alt={`A ${rightSide.name} logo`} />
          </div>
        </div>
        <h3 className="col-5 text-center mt-3 mb-4">{leftSide.fullName}</h3>
        <span className="col-2"></span>
        <h3 className="col-5 text-center mt-3 mb-4">{rightSide.fullName}</h3>
        <h3 className="col-5 text-center my-1">{leftSide.wins}</h3>
        <span className="col-2 text-center align-self-center h4 my-1">wins</span>
        <h3 className="col-5 text-center my-1">{rightSide.wins}</h3>
        <h3 className="col-5 text-center my-1">{leftSide.ppg}</h3>
        <span className="col-2 text-center align-self-center h4 my-1">PPG</span>
        <h3 className="col-5 text-center my-1">{rightSide.ppg}</h3>
      </div>
    </div>
  )
}

export default GamesRivalry
