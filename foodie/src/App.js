import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import MyPayments from "./components/MyPayments";
import Menu from "./components/Menu";
import Success from "./components/Success";

function App() {
  return (
    <Router>
      <div className="App">
        {/*Maybe add className here and Navbar element*/}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/payment-history" exact component={MyPayments} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/success" exact component={Success} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
