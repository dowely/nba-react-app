import { useEffect, useState } from "react"
import Axios from "axios"

function useTeams() {
  const [teams, setTeams] = useState(null)

  const url = "https://api.balldontlie.io/v1/teams"

  useEffect(() => {
    ;(async function () {
      try {
        const response = await Axios.get(url, { headers: { Authorization: process.env.APIKEY } })

        setTeams(response.data.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return teams
}

export default useTeams
