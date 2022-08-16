import React from "react"
import { Link, NavLink } from "react-router-dom"
import NBALogo from "../images/nba-logo.png"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container">
        <Link to="/" className="navbar-brand fs-2 fw-semibold text-dark fst-italic">
          <img src={NBALogo} height="64" alt="NBA Logo" className="me-3 p-1 bg-white rounded-3" />
          NBApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <ul className="navbar-nav fs-5">
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/games">
                Games
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/standings">
                Standings
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
