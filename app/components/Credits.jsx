import React from "react"
import Page from "./Page.jsx"

function Credits() {
  return (
    <Page title="Credits">
      <div className="col-lg-8 offset-lg-2">
        <figure className="text-end mt-3 mt-md-4">
          <blockquote className="blockquote">
            <q>Alone we can do so little; together we can do so much.</q>
          </blockquote>
          <figcaption className="blockquote-footer">
            <cite title="Helen Keller">Helen Keller</cite>
          </figcaption>
        </figure>

        <p className="lead my-4">
          This website wouldn't come about without some 3rd party assets. In particular the author
          wants to give thanks to...
        </p>

        <div className="row gy-1 mb-3">
          <div className="col-12">
            <a href="http://www.balldontlie.io" target="_blank">
              http://www.balldontlie.io
            </a>
          </div>
          <div className="col-12">for NBA teams and games data</div>
        </div>

        <div className="row gy-1 mb-3">
          <div className="col-12">
            <a href="https://www.sportslogos.net" target="_blank">
              https://www.sportslogos.net
            </a>
          </div>
          <div className="col-12">for teams logo images</div>
        </div>

        <div className="row gy-1">
          <div className="col-12">
            <a href="https://www.wikipedia.org" target="_blank">
              https://www.wikipedia.org/
            </a>
          </div>
          <div className="col-12">for teams related information</div>
        </div>
      </div>
    </Page>
  )
}

export default Credits
