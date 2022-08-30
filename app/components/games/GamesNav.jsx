import React, { useEffect } from "react"

function GamesNav({ nav, pagination, params, setParams, dispatch }) {
  function handleNavigation(action) {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0
    })
  }

  return (
    <nav className="pt-2">
      <ul className="pagination justify-content-center mt-4 mb-1">
        <li
          role={nav.startsWith === 1 ? undefined : "button"}
          className={"page-item " + (nav.startsWith === 1 ? "disabled" : "")}
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
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  )
}

export default GamesNav
