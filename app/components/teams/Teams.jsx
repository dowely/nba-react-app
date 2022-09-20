import React from "react"

//components
import Page from "../Page.jsx"
import TeamDivision from "./TeamDivision.jsx"

function Teams() {
  return (
    <Page title="Teams">
      <div className="row mt-3 mt-lg-5 gx-5">
        <div className="col-lg-6">
          <h3 className="text-center text-lg-start">Western</h3>
          <hr className="mb-4" />
          <div className="vstack gap-5">
            <TeamDivision division="Northwest" />
            <TeamDivision division="Pacific" />
            <TeamDivision division="Southwest" />
          </div>
        </div>
        <div className="col-lg-6 mt-5 mt-lg-0">
          <h3 className="text-center text-lg-start">Eastern</h3>
          <hr className="mb-4" />
          <div className="vstack gap-5">
            <TeamDivision division="Atlantic" />
            <TeamDivision division="Central" />
            <TeamDivision division="Southeast" />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Teams
