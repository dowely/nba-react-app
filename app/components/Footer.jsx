import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
      <hr className="mt-5" />
      <nav className="nav justify-content-center mb-1">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <div className="vr align-self-center"></div>
        <Link className="nav-link" to="/about">
          About
        </Link>
        <div className="vr align-self-center"></div>
        <Link className="nav-link" to="/credits">
          Credits
        </Link>
      </nav>
      <div className="text-center text-muted small">
        <p className="mb-1">
          Copyright &copy; {new Date().getFullYear()} NBApp. All rights reserved.
        </p>
        <p>
          Made with &#10084;&#65039; by Marcin Ogar (
          <a className="link-primary" target="_blank" href="https://github.com/dowely">
            @dowely
          </a>
          )
        </p>
      </div>
    </>
  )
}

export default Footer
