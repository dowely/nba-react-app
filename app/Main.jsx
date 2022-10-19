import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./styles/custom.css"

import Axios from "axios"
import qs from "qs"

Axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, { arrayFormat: "repeat" })
}

import AppProvider from "./providers/AppProvider.jsx"

//global components
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import FlashMessages from "./components/FlashMessages.jsx"
import Toast from "./components/Toast.jsx"

//pages
import Home from "./components/home/Home.jsx"
import Games from "./components/games/Games.jsx"
import Standings from "./components/standings/Standings.jsx"
import Teams from "./components/teams/Teams.jsx"
import TeamProfile from "./components/teams/TeamProfile.jsx"
import About from "./components/About.jsx"
import Credits from "./components/Credits.jsx"

function Main() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <FlashMessages />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/games" element={<Games />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toast />
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"))

root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
