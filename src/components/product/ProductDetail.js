import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { Table } from "react-bootstrap"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "react-rating"
import {
  updateProduct,
  deleteProduct
} from "../../redux/actions/productActions"
import { lcboImg } from "./ProductList"

function ProductDetail(props) {
  const { match } = props
  const [localProduct, setLocalProduct] = useState({})

  useEffect(() => {
    const product = props.products.find(
      product => `${product.id}` === match.params.id
    )
    if (product) {
      setLocalProduct(product)
    }
  })

  const [wikibox, setWikibox] = useState()
  useEffect(() => {
    if (localProduct.name) {
      const fetchWikidata = async () => {
        const data = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${
            localProduct.name
          }&rvsection=0&rvparse`,
          {
            params: {
              origin: "*"
            }
          }
        )
        if (data.status === 200) {
          try {
            /* 
              Dont look at this. Wikipedia api was not very nice  🙈 Who returns raw HTML???
              */
            const pages = data.data.query.pages
            const revisions = pages[Object.keys(pages)[0]].revisions[0]
            if (
              !revisions[Object.keys(revisions)[0]].includes("Redirect to:")
            ) {
              setWikibox(revisions[Object.keys(revisions)[0]])
            }
          } catch (e) {
            console.error("Something went wrong", e)
          }
        }
      }
      fetchWikidata()
    }
  })

  const tableData = localProduct
    ? Object.entries(localProduct)
        .filter(([key]) => {
          return [
            "name",
            "producer_name",
            "tasting_note",
            "serving_suggestion",
            "regular_price_in_cents"
          ].includes(key)
        })
        .map(([key, val], i) => {
          return (
            <tr key={i}>
              <th>{key}</th>
              <td>
                <Form.Control
                  type="text"
                  onChange={e => {
                    let newProduct = { ...localProduct }
                    newProduct[key] =
                      key === "regular_price_in_cents"
                        ? parseFloat(e.target.value)
                        : e.target.value
                    props.updateProduct(newProduct)
                  }}
                  value={val}
                  placeholder={`Enter ${key}`}
                />
              </td>
            </tr>
          )
        })
    : null

  if (!localProduct.id) {
    return (
      <Container>
        <Link to="/products">
          <Button variant="outline-dark" size="sm">
            ⬅ Back to products
          </Button>
        </Link>
        <h1 className="text-center">We found no product 🧐</h1>
      </Container>
    )
  }

  return (
    <div className="ProductDetail">
      <Container className="mb-5">
        <Link to="/products">
          <Button variant="outline-dark" size="sm">
            ⬅ Back to products
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          className="float-right"
          onClick={() => {
            if (
              confirm(`Are you sure you want to delete "${localProduct.name}"?`)
            ) {
              props.deleteProduct(localProduct)
              props.history.push("/products")
            }
          }}
        >
          Delete this product
        </Button>
        <Row>
          <Col xs="12" lg={wikibox ? "8" : "12"}>
            <h3 className="mb-4 mt-5">Product detail {localProduct.name}</h3>
            <img
              alt={localProduct.name}
              className="rounded mx-auto d-block"
              src={lcboImg(localProduct.id)}
            />
            <Table striped bordered hover>
              <tbody>
                {tableData}
                <tr>
                  <th>Notes / comments</th>
                  <td>
                    <Form.Control
                      type="text"
                      onChange={e => {
                        let newProduct = {
                          ...localProduct,
                          comments: e.target.value
                        }
                        props.updateProduct(newProduct)
                      }}
                      value={localProduct.comments ? localProduct.comments : ""}
                      placeholder={`Enter a comment about this product`}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td>
                    <Rating
                      initialRating={
                        localProduct.rating ? localProduct.rating : 0
                      }
                      onChange={val => {
                        let newProduct = {
                          ...localProduct,
                          rating: val
                        }
                        props.updateProduct(newProduct)
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          {wikibox ? (
            <Col xs="12" lg="3" className="mt-5">
              <h3>
                Some info from wikipedia <br />
                <small>(how interesting! 🤔)</small>
                <br />
                <br />
              </h3>
              {/* 
                Dont look at this. Wikipedia api was not very nice  🙈 Who returns raw HTML???
                */}
              <div dangerouslySetInnerHTML={{ __html: wikibox }} />
            </Col>
          ) : null}
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.product.products
})

export default connect(
  mapStateToProps,
  {
    updateProduct,
    deleteProduct
  }
)(ProductDetail)
