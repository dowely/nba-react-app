import React from "react"
import NBALogo from "../assets/images/nba-logo.png"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container">
        <a href="#" className="navbar-brand fs-2 fw-semibold text-dark fst-italic">
          <img src={NBALogo} height="64" alt="NBA Logo" className="me-3 p-1 bg-white rounded-3" />
          NBApp
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <ul class="navbar-nav fs-5">
            <li class="nav-item px-2">
              <a class="nav-link active" aria-current="page" href="#">
                Games
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link" href="#">
                Standings
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link" href="#">
                Teams
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
