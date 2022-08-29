import React, { useEffect } from "react"
import Container from "./Container.jsx"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | NBApp`
    setTimeout(() =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    )
  }, [])

  return <Container>{props.children}</Container>
}

export default Page
