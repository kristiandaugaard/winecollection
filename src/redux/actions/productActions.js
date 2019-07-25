export const addProduct = product => {
  return {
    type: "CREATE_PRODUCT_SUCCESS",
    payload: {
      product
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
