import { useState, useEffect } from "react"
import Axios from "axios"

function useGamesByIds(ids, dispatch) {
  const [gamesByIds, setGamesByIds] = useState(null)

  const url = "https://www.balldontlie.io/api/v1/games"

  useEffect(() => {
    async function fetchGames() {
      let results = []

      try {
        const requests = ids.map(id => Axios.get(url + `/${id}`))

        const responses = await Promise.all(requests)

        responses.forEach(response => {
          results.push(response.data)
        })

        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setGamesByIds(results)
      } catch (error) {
        console.error(error)

        const errors = {
          429: "Too many requests. Try again later"
        }

        dispatch({ type: "error", err: errors[error.response.status] })
      }
    }

    if (ids) fetchGames()
  }, [ids])

  return gamesByIds
}

export default useGamesByIds
