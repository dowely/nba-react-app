import React from "react"
import Page from "./Page.jsx"
import ProjectCard from "./ProjectCard.jsx"
import mOgarPhoto from "../images/mOgar.jpg"
import spaceTravel from "../images/spaceTravel.png"
import spaceQR from "../images/spaceQR.png"
import scribbleFront from "../images/scribbleFront.png"
import scribbleQR from "../images/scribbleQR.png"
import { BsGithub, BsFillEnvelopeFill, BsTelephoneFill } from "react-icons/bs"

function About() {
  return (
    <Page title="About">
      <div className="row g-4">
        <div className="col-12 col-md-6 pb-3">
          <p className="text-danger mt-3 mt-lg-5">Hi, my name is</p>
          <h1 className="fw-bold text-dark">Marcin Ogar.</h1>
          <h2 className="text-muted mb-3">I make interactive web apps with code.</h2>
          <p className="lead">
            React (Javascript library) is one of my main interests. Take this website as an example;
            with React and Bootstrap as the visual building blocks and real data API under the hood.
            It's a great tool for searching through NBA games and view the statistics. You can also
            personalize the app by selecting your favourite teams. This will help you keep track of
            their recent as well as up-coming games.
          </p>
          <p className="lead mb-4">
            If you find this project appealing you might consider hiring me. I would love to take on
            the next challenge
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
        <div className="col-12 col-md-6 col-lg-5 col-xl-4 ms-lg-auto pt-md-4 pe-lg-4">
          <div className="card text-bg-light border-secondary">
            <img src={mOgarPhoto} className="card-img-top" alt="A Marcin Ogar profile photo" />
            <div className="card-body">
              <h5 className="card-title mb-3">Freelance Developer</h5>
              <p className="card-text">
                I'm a Poland-based web developer, engineer, who specializes in front-end
                technologies. I took up computer programming in 2017 and a few years later became a
                self-taught JavaScript coder with a knack for CSS. Data manipulation and its
                presentation to the user is something I find particularly interesting.
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
        <div className="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
          <p className="lead text-center my-2 my-lg-4">
            Not sure yet? Check out my other projects to get a better insight into my skill set.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-5 ms-lg-auto me-lg-3">
          <ProjectCard
            image={spaceTravel}
            title="Space Travel"
            text="A static website for a fictional space travel agency, build as a front-end practice. Think about many Javascript features and elegant styling."
            gitEndPoint="space-travel"
            QRCode={spaceQR}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-5 me-lg-auto ms-lg-3 pt-3 pt-md-0">
          <ProjectCard
            image={scribbleFront}
            title="Scribble App"
            text="A full-blown idea of a web browser tool for time management and team collaboration. Written in vanilla Javascript and EJS templates. It's also visually pleasing."
            gitEndPoint="scribble-front"
            QRCode={scribbleQR}
          />
        </div>
      </div>
    </Page>
  )
}

export default About
