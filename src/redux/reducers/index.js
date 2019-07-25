import { combineReducers } from "redux"

// import appReducer from './appReducer'
import productReducer from "./productReducer"
// import cartReducer from './cartReducer'
// import redeemerReducer from './redeemer'
// import bookingReducer from './booking'

export default combineReducers({
  product: productReducer
  // cart: cartReducer,
  // app: appReducer,
  // redeemer: redeemerReducer,
  // booking: bookingReducer
})
