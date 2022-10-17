import React from "react"
import Page from "./Page.jsx"
import mOgarPhoto from "../images/mOgar.jpg"
import spaceTravel from "../images/spaceTravel.png"
import spaceQR from "../images/spaceQR.png"
import scribbleFront from "../images/scribbleFront.png"
import { BsGithub, BsFillEnvelopeFill, BsTelephoneFill } from "react-icons/bs"

function About() {
  return (
    <Page title="About">
      <div className="row g-4">
        <div className="col-12 pb-2">
          <p className="text-danger mt-3">Hi, my name is</p>
          <h1 className="fw-bold text-dark">Marcin Ogar.</h1>
          <h2 className="text-muted mb-3">I make interactive web apps with code.</h2>
          <p className="lead">
            React (Javascript library) is one of my main interests. Take this website as an example;
            with React and Bootstrap as the visual building blocks and real data API under the hood.
            If you find this project appealing you might consider hiring me
            <span className="text-danger fw-bold">.</span>
          </p>
          <a
            className="btn btn-outline-danger"
            href="https://github.com/dowely/nba-react-app"
            role="button"
            target="_blank"
          >
            View the source code
          </a>
        </div>
        <div className="col-12">
          <div className="card text-bg-light border-secondary">
            <img src={mOgarPhoto} className="card-img-top" alt="A Marcin Ogar profile photo" />
            <div className="card-body">
              <h5 className="card-title mb-3">Freelance Developer</h5>
              <p className="card-text">
                I'm a Poland-based web developer, engineer, who specializes in front-end
                technologies. I took up computer programming several years ago and have now become a
                self-thaught Javascript coder with a knack for CSS. I also like woodworking and
                volleyball.
              </p>
              <a href="https://github.com/dowely" className="btn btn-secondary" target="_blank">
                <BsGithub size="1.5em" />
                <span className="ms-2">My Repos</span>
              </a>
            </div>
            <div className="card-footer text-muted">
              <div>
                <BsFillEnvelopeFill />
                <span className="ms-3">marcin.ogar@gmail.com</span>
              </div>
              <div>
                <BsTelephoneFill />
                <span className="ms-3">+48 608 108 099</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <p className="lead text-center mb-0">
            Not sure yet? Check out my other projects to get a better insight into my skillset.
          </p>
        </div>
        <div className="col-12">
          <div className="card shadow">
            <img src={spaceTravel} className="card-img-top" alt="A space-travel project snapshot" />
            <div className="card-body">
              <h5 className="card-title mb-3">Space Travel</h5>
              <p className="card-text">
                A static website for a fictional space travel agency, build as a front-end practice.
                Think of many Javascript features and elegant styling.
              </p>
              <a
                href="https://github.com/dowely/space-travel"
                className="btn btn-primary"
                target="_blank"
              >
                {"Code < />"}
              </a>
              <div className="btn-group ms-3" role="group">
                <a
                  href="https://dowely.github.io/space-travel/"
                  className="btn btn-primary"
                  target="_blank"
                >
                  Demo
                </a>
                <button
                  type="button"
                  className="btn btn-primary border border-light border-opacity-25 border-top-0 border-end-0 border-bottom-0"
                  data-bs-toggle="dropdown"
                  style={{
                    "border-top-right-radius": ".375rem",
                    "border-bottom-right-radius": ".375rem"
                  }}
                >
                  &#9660;
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <h6>View it on mobile</h6>
                    <div>
                      <img src={spaceQR} alt="Space travel website QR link" className="img-fluid" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default About
