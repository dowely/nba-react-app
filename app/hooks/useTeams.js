import { useEffect, useState } from "react"
import Axios from "axios"

function useTeams() {
  const [teams, setTeams] = useState(null)

  const url = "https://www.balldontlie.io/api/v1/teams"

  useEffect(() => {
    ;(async function () {
      try {
        const response = await Axios.get(url)

        setTeams(response.data.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return teams
}

export default useTeams
