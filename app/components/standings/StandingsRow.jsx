import React, { useEffect } from "react"

function StandingsRow({ rowNo, standingTeam, season, tabIndex }) {
  const tap = standingTeam.seasons && standingTeam.seasons.find(record => record.season === season)

  const columns = [
    {
      label: "W",
      data: tap && tap.winsLosses[0],
      className:
        (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
        " text-center d-xl-table-cell ps-4 px-xl-3"
    },
    {
      label: "L",
      data: tap && tap.winsLosses[1],
      className:
        (tabIndex === 1 ? "d-table-cell" : tabIndex === 3 ? "d-md-table-cell d-none" : "d-none") +
        " text-center d-xl-table-cell px-3"
    }
  ]

  return (
    <tr className="align-middle">
      <th scope="row" className="pe-1">
        {rowNo}
      </th>
      <td className="border-end">
        <div className="col-3 col-lg-2 d-inline-block me-2">
          <img
            src={standingTeam.logo}
            alt={`A ${standingTeam.full_name} logo`}
            className="img-fluid img-thumbnail"
          />
        </div>
        <span className="d-sm-none">{standingTeam.name}</span>
        <span className="d-none d-sm-inline">{standingTeam.full_name}</span>
      </td>
      {columns.map(column => (
        <td key={column.label} className={column.className}>
          {column.data || (
            <p className="placeholder-glow mb-0">
              <span class="placeholder col-12"></span>
            </p>
          )}
        </td>
      ))}
    </tr>
  )
}

export default StandingsRow

/*
<tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr> */
