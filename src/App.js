import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Footer from "./components/Footer";
import Currencies from "./containers/Currencies";

export default function App() {
  return (
    <Router>
      <Navbar>
        <Navbar.Brand href="/">Currencies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-Navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://exchangeratesapi.io/">Source</Nav.Link>
            <Nav.Link href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html">
              Data sets
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/">
          <Currencies />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
