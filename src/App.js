import React from "react"
import "./sass/App.sass"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "./redux/store"
import routes from "./routes"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/header/Header"

function App() {
  const routeList = routes.map((route, i) => (
    <Route
      path={route.url}
      key={i}
      exact={route.exact ? true : false}
      component={route.component}
    />
  ))
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Header />
            <Switch>{routeList}</Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
