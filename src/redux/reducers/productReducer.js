import { apiProducts } from "../../fakeapi"

export default function(
  state = {
    products: [...apiProducts],
    filter: "",
    sortBy: null,
    sortDirection: "asc"
  },
  action
) {
  switch (action.type) {
    case "CREATE_PRODUCT_SUCCESS": {
      const { product } = action.payload

      return {
        ...state,
        products: [...state.products, product]
      }
    }

    case "CHANGE_PRODUCT_LIST_SORT_KEY": {
      const { key } = action.payload

      let sortDirection

      if (state.sortBy === key && state.sortDirection !== "desc") {
        sortDirection = "desc"
      } else {
        sortDirection = "asc"
      }

      return {
        ...state,
        products: state.products.sort((a, b) => {
          /**
           * Sort array of object based on ${key}
           */
          if (sortDirection === "asc") {
            return b[key] > a[key] ? -1 : 1
          }
          return a[key] > b[key] ? -1 : 1
        }),
        sortBy: key,
        sortDirection
      }
    }

    case "UPDATE_PRODUCT_SUCCESS": {
      const { product } = action.payload

      let products = [...state.products]

      //Find product based on id, and update it
      products = products.map(obj =>
        obj.id === product.id ? { ...obj, ...product } : obj
      )

      return {
        ...state,
        products
      }
    }

    case "DELETE_PRODUCT_SUCCESS": {
      const { product } = action.payload

      const newProducts = [...state.products].filter(
        obj => obj.id !== product.id
      )

      return {
        ...state,
        products: newProducts
      }
    }

    default:
      return state
  }
}
