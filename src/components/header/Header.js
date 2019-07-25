import React from "react"
import { Container } from "react-bootstrap"
import Nav from "./Nav"

const Header = () => {
  return (
    <div className="mb-3 bg-white border-bottom shadow-sm">
      <Container className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          The Beverage Buddies
        </h5>
        <Nav />
      </Container>
    </div>
  )
}

export default Header
