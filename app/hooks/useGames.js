import { useState, useEffect } from "react"
import Axios from "axios"

function useGames(params, dispatch) {
  const [games, setGames] = useState(null)

  const url = "https://api.balldontlie.io/v1/games"

  useEffect(() => {
    let optParams = { ...params }

    if (params && params["team_ids[]"] && params["team_ids[]"].length >= 15) {
      const { "team_ids[]": unwanted, ...rest } = params

      optParams = rest
    }

    async function fetchGames() {
      let results = []

      try {
        const firstResponse = await Axios.get(url, {
          params: optParams,
          headers: { Authorization: process.env.APIKEY }
        })

        const meta = firstResponse.data.meta

        if (meta.total_pages > 50) throw { response: { status: 50 } }

        results.push(...firstResponse.data.data)

        if (meta.next_page) {
          const requests = []

          for (let page = meta.next_page; page <= meta.total_pages; page++) {
            requests.push(
              Axios.get(url, {
                params: { ...optParams, page },
                headers: { Authorization: process.env.APIKEY }
              })
            )
          }

          const responses = await Promise.all(requests)

          responses.forEach(response => {
            results.push(...response.data.data)
          })
        }

        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setGames(results)
      } catch (error) {
        console.error(error)

        const errors = {
          429: "Too many requests. Try again later",
          50: "Too many results. Please narrow your search"
        }

        dispatch({ type: "error", err: errors[error.response.status] })
      }
    }

    if (params) fetchGames()
  }, [params])

  return games
}

export default useGames
