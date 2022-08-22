import { useState, useEffect } from "react"
import Axios from "axios"

function useGames(params) {
  const [games, setGames] = useState(null)

  const url = "https://www.balldontlie.io/api/v1/games"

  useEffect(() => {
    ;(async function () {
      let results = []

      try {
        const firstResponse = await Axios.get(url, { params })

        const meta = firstResponse.data.meta

        results.push(...firstResponse.data.data)

        if (meta.next_page) {
          const requests = []

          for (let page = meta.next_page; page <= meta.total_pages; page++) {
            requests.push(Axios.get(url, { params: { ...params, page } }))
          }

          const responses = await Promise.all(requests)

          responses.forEach(response => {
            results.push(...response.data.data)
          })
        }

        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setGames(results)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [params])

  return games
}

export default useGames
