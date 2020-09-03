import React from "react";
import { Dropdown } from "react-bootstrap";

const CurrencyBaseDropdown = ({ availableCurrencies, setBase, base }) => {
  return (
    <Dropdown className="mb-4">
      <h3>Base: {base}</h3>
      <Dropdown.Toggle id="dropdown-currencies">Switch Base</Dropdown.Toggle>
      <Dropdown.Menu>
        {availableCurrencies.map((value) => (
          <Dropdown.Item
            active={value === base}
            key={value}
            onClick={setBase.bind(null, value)}
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CurrencyBaseDropdown;
