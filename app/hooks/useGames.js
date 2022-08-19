import { useState, useEffect } from "react"
import Axios from "axios"

function useGames(params) {
  const [games, setGames] = useState(null)

  useEffect(() => {
    ;(async function () {
      try {
        const response = await Axios.get("https://www.balldontlie.io/api/v1/games", { params })

        setGames(response.data)
      } catch (error) {
        console.error(error.data)
      }
    })()
  }, [params])

  return games
}

export default useGames
