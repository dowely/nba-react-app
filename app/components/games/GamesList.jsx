import React, { forwardRef, useEffect } from "react"

const GamesList = forwardRef(({ list, params }, ref) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  })

  return (
    <ul className="list-group list-group-flush">
      {Object.entries(list)
        .filter(([date, { onPage }]) => onPage === parseInt(params.get("page")))
        .map(dateCollection => {
          const date = new Date(dateCollection[0])
          const games = dateCollection[1].games

          return (
            <li
              ref={dateCollection[1].upNext ? ref : undefined}
              key={dateCollection[0]}
              className="list-group-item d-flex"
            >
              <div className="col-3">
                <span className="lead">
                  {["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"][
                    date.getDay()
                  ] + ","}
                </span>
                <h4>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ][date.getMonth()] +
                    " " +
                    date.getDate() +
                    ", " +
                    date.getFullYear()}
                </h4>
                <small className="text-muted">{`${games.length} game${
                  games.length > 1 ? "s" : ""
                }`}</small>
              </div>
              <div className="col-9">
                <div className="row pt-2">
                  <h5 className="col-3">Time</h5>
                  <h5 className="col-6">Teams</h5>
                  <h5 className="col-3">Result</h5>
                </div>
                <hr />
                <ul className="list-group list-group-flush">
                  {games.map(game => (
                    <li key={game.id} className="list-group-item d-flex px-0">
                      {game.id}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
    </ul>
  )
})

export default GamesList
