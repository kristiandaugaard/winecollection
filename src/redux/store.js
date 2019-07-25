import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./reducers"

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}

const middleware = applyMiddleware(thunk)

export let store = createStore(
  persistedReducer,
  initialState,
  compose(
    middleware,
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
)

export let persistor = persistStore(store)
