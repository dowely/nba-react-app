import React from "react"
import { Link } from "react-router-dom"

function StandingsRow({ rowNo, standingTeam, season, tabIndex, topStanding }) {
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
    },
    {
      label: "PCT",
      data: tap && tap.pct.toString().substring(1),
      className:
        (tabIndex === 2
          ? "d-table-cell d-md-none ps-4"
          : tabIndex === 1 || tabIndex === 3
          ? "d-none d-md-table-cell"
          : "d-none") + " text-center d-xl-table-cell px-md-2 px-xl-3"
    },
    {
      label: "GB",
      data: tap && topStanding && (topStanding.winsLosses[0] - tap.winsLosses[0] || "-"),
      className:
        (tabIndex === 2
          ? "d-table-cell d-md-none"
          : tabIndex === 1 || tabIndex === 3
          ? "d-none d-md-table-cell"
          : "d-none") + " text-center d-xl-table-cell px-2 px-md-3"
    },
    {
      label: "Home",
      data: tap && `${tap.home[0]}-${tap.home[1]}`,
      className:
        (tabIndex === 3
          ? "d-table-cell d-md-none ps-3 pe-1"
          : tabIndex === 2 || tabIndex === 4
          ? "d-none d-md-table-cell"
          : "d-none") + " text-center d-xl-table-cell ps-md-4 pe-md-2 px-xl-3"
    },
    {
      label: "Away",
      data: tap && `${tap.away[0]}-${tap.away[1]}`,
      className:
        (tabIndex === 3
          ? "d-table-cell d-md-none"
          : tabIndex === 2 || tabIndex === 4
          ? "d-none d-md-table-cell"
          : "d-none") + " text-center d-xl-table-cell px-0 px-md-3"
    },
    {
      label: "Div",
      data: tap && `${tap.div[0]}-${tap.div[1]}`,
      className:
        (tabIndex === 4
          ? "d-table-cell ps-2 pe-1"
          : tabIndex === 2
          ? "d-none d-md-table-cell"
          : "d-none") + " text-center d-xl-table-cell px-md-2"
    },
    {
      label: "Conf",
      data: tap && `${tap.conf[0]}-${tap.conf[1]}`,
      className:
        (tabIndex === 4 ? "d-table-cell" : tabIndex === 2 ? "d-none d-md-table-cell" : "d-none") +
        " text-center d-xl-table-cell px-0 px-md-2"
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
        <Link className="anchor" to={`/teams/${standingTeam.id}`}>
          <span className="d-sm-none">{standingTeam.name}</span>
          <span className="d-none d-sm-inline">{standingTeam.full_name}</span>
        </Link>
      </td>
      {columns.map(column => (
        <td key={column.label} className={column.className}>
          {column.data || (
            <p className="placeholder-glow mb-0">
              <span className="placeholder col-12"></span>
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
