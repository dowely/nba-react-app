import React, { useState, useEffect, useContext } from "react"
import { AiOutlineEye } from "react-icons/ai"
import { AppDispatch, AppState } from "../providers/AppProvider.jsx"

function WatchBtn({ className, style, gameId }) {
  const appState = useContext(AppState)
  const appDispatch = useContext(AppDispatch)

  return (
    <div
      role="button"
      className={
        className +
        ((JSON.parse(appState.watchlist) || []).includes(gameId)
          ? " text-bg-danger"
          : " text-bg-primary")
      }
      style={style}
      onClick={() => {
        const flash = { type: "flashMessage" }

        if ((JSON.parse(appState.watchlist) || []).includes(gameId)) {
          flash.msg = { text: "The game was removed from your watchlist", color: "danger" }
        } else {
          flash.msg = { text: "The game was added to your watchlist", color: "success" }
        }
        appDispatch(flash)
        appDispatch({ type: "toggleGameWatch", gameId })
      }}
    >
      <AiOutlineEye />
    </div>
  )
}

export default WatchBtn
