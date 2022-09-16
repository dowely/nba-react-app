import React from "react"

function TeamIntro({ team }) {
  return (
    <p className="mb-0 pe-xl-4">
      {team.intro.text}{" "}
      <a className="link-primary" target="_blank" href={team.intro.url}>
        [Wikipedia]
      </a>
    </p>
  )
}

export default TeamIntro
