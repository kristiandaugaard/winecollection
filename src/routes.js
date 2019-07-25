import React from "react"
import ProductList from "./components/product/ProductList"
import ProductDetail from "./components/product/ProductDetail"
import { Link } from "react-router-dom"
import { Container, Button } from "react-bootstrap"

const Home = () => (
  <div className="Home">
    <Container>
      <div className="text-center">
        <h3>We are home</h3>
        You dont want to be here! Go checkout our products
        <br />
        <br />
        <Link to="/products">
          <Button>View product list</Button>
        </Link>
      </div>
    </Container>
  </div>
)

const routes = [
  {
    url: "/",
    component: Home,
    title: "Home",
    exact: true
  },
  {
    url: "/products",
    component: ProductList,
    title: "Products",
    exact: true
  },
  {
    url: "/products/:id",
    component: ProductDetail,
    excludeFromNav: true
  }
]

export default routes
