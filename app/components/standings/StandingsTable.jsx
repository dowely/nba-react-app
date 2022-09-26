import React, { useState, useEffect } from "react"
import { BiRefresh } from "react-icons/bi"

function StandingsTable({ filter }) {
  const [tabIndex, setTabIndex] = useState(1)

  function handleTabIndex() {
    if (tabIndex === 4) setTabIndex(1)
    else setTabIndex(prev => prev + 1)
  }

  function generateThead() {
    const columns = [
      {
        label: "#",
        className: ""
      },
      {
        label: "Team",
        className: "position-relative border-end border-2 border-dark"
      },
      {
        label: "W",
        className:
          (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
          " text-center d-xl-table-cell"
      },
      {
        label: "L",
        className:
          (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
          " text-center d-xl-table-cell"
      },
      {
        label: "PCT",
        className:
          (tabIndex === 2
            ? "d-table-cell d-md-none"
            : tabIndex === 1 || tabIndex === 3
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell"
      },
      {
        label: "GB",
        className:
          (tabIndex === 2
            ? "d-table-cell d-md-none"
            : tabIndex === 1 || tabIndex === 3
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell"
      },
      {
        label: "Home",
        className:
          (tabIndex === 3
            ? "d-table-cell d-md-none"
            : tabIndex === 2 || tabIndex === 4
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell"
      },
      {
        label: "Away",
        className:
          (tabIndex === 3
            ? "d-table-cell d-md-none"
            : tabIndex === 2 || tabIndex === 4
            ? "d-none d-md-table-cell"
            : "d-none") + " text-center d-xl-table-cell"
      },
      {
        label: "Div",
        className:
          (tabIndex === 4 ? "d-table-cell" : tabIndex === 2 ? "d-none d-md-table-cell" : "d-none") +
          " text-center d-xl-table-cell"
      },
      {
        label: "Conf",
        className:
          (tabIndex === 4 ? "d-table-cell" : tabIndex === 2 ? "d-none d-md-table-cell" : "d-none") +
          " text-center d-xl-table-cell"
      }
    ]

    return (
      <thead className="table-warning">
        <tr>
          {columns.map(column => (
            <th scope="col" style={{ backgroundClip: "padding-box" }} className={column.className}>
              {column.label}
              {column.label === "Team" && (
                <div
                  onClick={handleTabIndex}
                  role="button"
                  className="badge text-bg-primary fs-3 position-absolute start-100 top-50 translate-middle d-flex d-xl-none align-items-center"
                  style={{ "--bs-badge-padding-x": "0.1em", "--bs-badge-padding-y": "0.01em" }}
                >
                  <BiRefresh />
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  return (
    <div className="card-body">
      <table className="table table-striped">
        {generateThead()}
        <tbody className="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StandingsTable
