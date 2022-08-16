import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/custom.css"

//global components
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

//pages
import Home from "./components/home/Home.jsx"
import Games from "./components/games/Games.jsx"
import Standings from "./components/standings/Standings.jsx"
import Teams from "./components/teams/Teams.jsx"
import About from "./components/About.jsx"
import Credits from "./components/Credits.jsx"

//home components

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/about" element={<About />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"))

root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
