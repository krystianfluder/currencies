import React from "react";
import { Button } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="p-4 d-flex algin-items-center justify-content-center">
      <Button variant="link" href="https://exchangeratesapi.io/">
        Source
      </Button>
      <Button
        variant="link"
        href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
      >
        Data sets
      </Button>
    </footer>
  );
};

export default Footer;
