import React from "react"
import Page from "../Page.jsx"
import GamesProvider from "../../providers/GamesProvider.jsx"
import HomeFollow from "./HomeFollow.jsx"
import HomeWatch from "./HomeWatch.jsx"
import HomeList from "./HomeList.jsx"

function Home() {
  return (
    <Page title="Welcome!">
      <div className="row gy-4 pt-4 gx-lg-5">
        <aside className="vstack gap-4 gap-md-5 order-lg-2 col-lg-6 col-xl-5">
          <HomeFollow />
          <GamesProvider>
            <HomeWatch />
          </GamesProvider>
        </aside>
        <main className="col-lg-6 col-xl-7">
          <h2 className="text-center mt-2 mt-lg-0 mt-xl-2 px-lg-2">
            The games of teams you follow
          </h2>
          <hr className="w-50 mx-auto my-3 mt-lg-4" />
          <GamesProvider>
            <HomeList />
          </GamesProvider>
        </main>
      </div>
    </Page>
  )
}

export default Home
