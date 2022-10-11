import React, { useState, useEffect, useContext } from "react"
import { AppState } from "../providers/AppProvider.jsx"

function FlashMessages() {
  const appState = useContext(AppState)

  const [beneath, setBeneath] = useState(true)

  useEffect(() => {
    if (appState.flashMessages.length) setBeneath(false)
  }, [appState.flashMessages])

  return (
    <div
      className={
        "d-flex w-100 px-4 position-fixed floating-alerts " +
        (beneath ? "floating-alerts--beneath" : "")
      }
    >
      {appState.flashMessages.map((msg, index) => {
        return (
          <div
            onAnimationEnd={() => setBeneath(true)}
            key={index}
            className={`floating-alert alert alert-${msg.color} mx-auto mb-0 text-center`}
            style={{ minWidth: "40vw" }}
          >
            {msg.text}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
