import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import {
  changeSortList,
  filterProductList
} from "../../redux/actions/productActions"
import AddModal from "./AddProductModal"

export const lcboImg = id =>
  `https://www.lcbo.com/content/dam/lcbo/products/${id}.jpg/jcr:content/renditions/cq5dam.web.319.319.jpeg`

function ProductList(props) {
  const { history, products } = props
  const [modalShow, setModalShow] = useState(false)
  const initialTableHeaders = [
    {
      name: "IMG",
      key: "img",
      activeSort: false
    },
    {
      name: "SKU",
      key: "id",
      activeSort: false
    },
    {
      name: "Name",
      key: "name",
      activeSort: false
    },
    {
      name: "Producer name",
      key: "producer_name",
      activeSort: false
    },
    {
      name: "Rating",
      key: "rating",
      activeSort: false
    },
    {
      name: "Price",
      key: "regular_price_in_cents",
      activeSort: false
    }
  ]
  const [tableHeaders, setTableHeaders] = useState(initialTableHeaders)
  const cheapestProduct = products.reduce((c, i) =>
    c.regular_price_in_cents > i.regular_price_in_cents ? i : c
  )
  const expensiveProduct = products.reduce((c, i) =>
    c.regular_price_in_cents < i.regular_price_in_cents ? i : c
  )
  const [priceSlider, setPriceSlider] = useState({
    min: cheapestProduct.regular_price_in_cents / 100,
    max: expensiveProduct.regular_price_in_cents / 100
  })

  const [filter, setFilter] = useState("")
  const [filterTimeout, setFilterTimeout] = useState(0)
  const doFilter = string => {
    if (filterTimeout) {
      clearTimeout(filterTimeout)
    }

    setFilter(string)
    setFilterTimeout(
      setTimeout(() => {
        setFilter(string)
      }, 500)
    )
  }

  const renderTableHeaders = tableHeaders.map((header, i) => (
    <th
      key={i}
      className={
        header.activeSort
          ? `table__header-sorter table__header-sorter--${props.sortDirection}`
          : "table__header-sorter"
      }
      onClick={() => {
        let newTableHeaders = [...initialTableHeaders]
        newTableHeaders[i].activeSort = true

        setTableHeaders(newTableHeaders)
        props.changeSortList(header.key)
      }}
    >
      {header.name}
    </th>
  ))

  const includeFilterText = product => {
    return filter
      ? product.name.toLowerCase().includes(filter.toLowerCase()) ||
          `${product.id}`.toLowerCase().includes(filter.toLowerCase())
      : true
  }

  const filterPriceByRange = ({ regular_price_in_cents }) => {
    return (
      regular_price_in_cents / 100 >= priceSlider.min &&
      regular_price_in_cents / 100 <= priceSlider.max
    )
  }

  const tabledata = products
    .filter(includeFilterText)
    .filter(filterPriceByRange)
    .map((product, i) => (
      <tr
        key={i}
        className="table__row--link"
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <td>
          <img alt={product.name} height="100" src={lcboImg(product.id)} />
        </td>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.producer_name}</td>
        <td>{product.rating ? `${product.rating} / 5` : "no rating"}</td>
        <td>${product.regular_price_in_cents / 100}</td>
      </tr>
    ))

  return (
    <div className="ProductList">
      <Container>
        <div className="text-center">
          <h3 className="mb-4 mt-5">
            Below you will see all products in the collection (total{" "}
            {products.length} products)
          </h3>
        </div>

        <AddModal show={modalShow} onHide={() => setModalShow(false)} />
        <div className="text-center">
          <Button
            className="mb-5"
            variant="outline-primary"
            onClick={() => setModalShow(true)}
          >
            Add new product
          </Button>
        </div>

        <Row>
          <Col xs="12" lg="8">
            <h5 className="mb-2">Filter by name / sku</h5>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search by name / sku"
              className=" mb-4"
              onChange={e => {
                const { value } = e.target
                doFilter(value)
              }}
              value={filter}
            />
          </Col>
          <Col xs="12" lg="4">
            <h5 className="mb-2">Filter by price</h5>
            <div className="mb-2 p-3">
              <InputRange
                maxValue={Math.round(
                  expensiveProduct.regular_price_in_cents / 100
                )}
                minValue={cheapestProduct.regular_price_in_cents / 100}
                value={priceSlider}
                onChange={value => {
                  setPriceSlider(value)
                }}
              />
            </div>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>{renderTableHeaders}</tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.product.products,
  sortDirection: state.product.sortDirection
})

export default connect(
  mapStateToProps,
  {
    changeSortList,
    filterProductList
  }
)(ProductList)
