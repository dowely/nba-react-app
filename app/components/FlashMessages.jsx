import React, { useContext } from "react"
import { AppState } from "../providers/AppProvider.jsx"

function FlashMessages() {
  const appState = useContext(AppState)

  return (
    <div className="floating-alerts d-flex w-100 position-fixed translate-middle-y">
      {appState.flashMessages.map((msg, index) => {
        return (
          <div
            key={index}
            className={`floating-alert alert alert-${msg.color} mx-auto mb-0 text-center`}
            style={{ minWidth: "35vw" }}
          >
            {msg.text}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages