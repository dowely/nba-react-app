import React from "react"

function TeamSummary({ team }) {
  const terms = [
    ["full_name", "Full Name:"],
    ["name", "Short Name:"],
    ["abbreviation", "Abbreviation:"],
    ["city", "City:"],
    ["conference", "Conference:"],
    ["division", "Division:"]
  ]

  return (
    <div className="card">
      <h3 className="card-header">Summary</h3>
      <dl className="card-body mb-0">
        {terms.map(([key, value], index) => (
          <div key={index} className="d-flex justify-content-between">
            <dt>{value}</dt>
            <dd>{team[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default TeamSummary
