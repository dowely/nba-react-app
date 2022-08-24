import React from "react"

//components
import Page from "../Page.jsx"
import DivisionTeams from "./DivisionTeams.jsx"

function Teams() {
  return (
    <Page title="Teams">
      <div className="row mt-5 gx-5">
        <div className="col-6">
          <h3>Western</h3>
          <hr className="mb-4" />
          <div className="vstack gap-5">
            <DivisionTeams division="Northwest" />
            <DivisionTeams division="Pacific" />
            <DivisionTeams division="Southwest" />
          </div>
        </div>
        <div className="col-6">
          <h3>Eastern</h3>
          <hr className="mb-4" />
          <div className="vstack gap-5">
            <DivisionTeams division="Atlantic" />
            <DivisionTeams division="Central" />
            <DivisionTeams division="Southeast" />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Teams
