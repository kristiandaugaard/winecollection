import React, { useState } from "react"
import { connect } from "react-redux"
import { Modal, Button, Form } from "react-bootstrap"
import { addProduct } from "../../redux/actions/productActions"

const AddProductModal = props => {
  const initialProductState = {
    id: 0,
    name: "",
    producer_name: "",
    serving_suggestion: "",
    regular_price_in_cents: 0
  }
  const [product, setProduct] = useState({ ...initialProductState })

  const fields = Object.entries(product).map(([key, value], i) => (
    <Form.Group key={i}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="text"
        onChange={e => {
          let newProduct = { ...product }
          let val = e.target.value
          if (key === "id" || key === "regular_price_in_cents") {
            val = val ? parseInt(val.replace(/[^0-9.]/g, "")) : val
          }
          newProduct[key] = val
          setProduct(newProduct)
        }}
        value={value}
        placeholder={`Enter ${key}`}
      />
    </Form.Group>
  ))

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new product. <small>🍷</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{fields}</Modal.Body>
      <Modal.Footer>
        <Button
          className="mr-auto"
          onClick={() => {
            props.addProduct(product)
            setProduct({ ...initialProductState })
            props.onHide()
          }}
        >
          Add product
        </Button>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default connect(
  null,
  {
    addProduct
  }
)(AddProductModal)
