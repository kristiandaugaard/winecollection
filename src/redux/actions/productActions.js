export const addProduct = product => {
  const {
    id,
    name,
    primary_category,
    product_package,
    regular_price_in_cents
  } = product

  return {
    type: "CREATE_PRODUCT_SUCCESS",
    payload: {
      product: {
        id: id.parseInt,
        name,
        primary_category,
        product_package,
        regular_price_in_cents
      }
    }
  }
}

export const updateProduct = product => {
  return {
    type: "UPDATE_PRODUCT_SUCCESS",
    payload: {
      product
    }
  }
}

export const changeSortList = key => {
  return {
    type: "CHANGE_PRODUCT_LIST_SORT_KEY",
    payload: {
      key
    }
  }
}

export const deleteProduct = product => {
  return {
    type: "DELETE_PRODUCT_SUCCESS",
    payload: {
      product
    }
  }
}
