import React from "react"
import ReactDOM from "react-dom"

//components
import Header from "./components/Header.jsx"

function Main() {
  return (
    <>
      <Header />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"))

root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
