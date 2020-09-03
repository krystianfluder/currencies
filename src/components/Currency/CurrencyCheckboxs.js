import React from "react";
import { Form } from "react-bootstrap";

const CurrencyCheckboxs = ({
  availableCurrencies,
  selectCurrency,
  selectedCurrencies,
}) => {
  const parseData = [];

  availableCurrencies.forEach((currency) => {
    let checked = false;
    const index = selectedCurrencies.findIndex((item) => item === currency);
    if (index !== -1) {
      checked = true;
    }
    parseData.push({
      currency,
      checked,
    });
  });

  return (
    <div className="mb-4">
      <h3>Select currencies</h3>
      <Form>
        {parseData.map((item) => (
          <Form.Check
            key={item.currency}
            defaultChecked={item.checked}
            label={item.currency}
            type="checkbox"
            onClick={selectCurrency.bind(null, item.currency)}
          />
        ))}
      </Form>
    </div>
  );
};

export default CurrencyCheckboxs;
