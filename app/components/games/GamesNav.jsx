import React from "react"

function GamesNav({ nav, pagination, params, setParams, dispatch }) {
  function handleNavigation(action) {
    if (typeof action === "number") {
      params.set("page", action)
      setParams(params)
    }

    if (action === "prev" && nav.startsWith > 1) {
      params.set("page", nav.startsWith - 1)
      setParams(params)

      dispatch({ type: "updateNav", value: "end" })
    }

    if (action === "next" && nav.endsWith < pagination.totalPages) {
      params.set("page", nav.endsWith + 1)
      setParams(params)

      dispatch({ type: "updateNav", value: "start" })
    }

    dispatch({ type: "scrollToBottom" })
  }

  return (
    <nav className="pt-2">
      <ul
        className={
          "pagination justify-content-center mt-4 mb-1 " +
          (window.matchMedia("(max-width: 450px)").matches ? "pagination-sm" : "")
        }
      >
        <li
          role={nav.startsWith === 1 ? undefined : "button"}
          className={"page-item " + (nav.startsWith === 1 ? "disabled" : "")}
          onClick={() => handleNavigation("prev")}
        >
          <span className="page-link">Previous</span>
        </li>
        {Array.from(
          {
            length: nav.endsWith - nav.startsWith + 1
          },
          (v, i) => (
            <li
              role="button"
              key={i}
              className={
                "page-item " + (parseInt(params.get("page")) === nav.startsWith + i ? "active" : "")
              }
              onClick={() => handleNavigation(nav.startsWith + i)}
            >
              <span className="page-link">{nav.startsWith + i}</span>
            </li>
          )
        )}
        <li
          role={nav.endsWith === pagination.totalPages ? undefined : "button"}
          className={"page-item " + (nav.endsWith === pagination.totalPages ? "disabled" : "")}
          onClick={() => handleNavigation("next")}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  )
}

export default GamesNav
