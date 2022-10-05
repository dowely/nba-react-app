import React from "react"
import Page from "../Page.jsx"
import GamesProvider from "../../providers/GamesProvider.jsx"
import HomeFollow from "./HomeFollow.jsx"
import HomeWatch from "./HomeWatch.jsx"
import HomeList from "./HomeList.jsx"

function Home() {
  return (
    <Page title="Welcome!">
      <div className="row gy-4 pt-4">
        <aside className="vstack gap-4">
          <HomeFollow />
          <GamesProvider>
            <HomeWatch />
          </GamesProvider>
        </aside>
        <main>
          <h2 className="text-center mt-2">The games of teams you follow</h2>
          <hr className="w-50 mx-auto my-3 my-xl-4" />
          <GamesProvider>
            <HomeList />
          </GamesProvider>
        </main>
      </div>
    </Page>
  )
}

export default Home
