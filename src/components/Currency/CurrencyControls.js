import React from "react";
import { ButtonGroup, Button, Form } from "react-bootstrap";

import moment from "moment";

const buttons = {
  MONTHS_1: "MONTHS_1",
  MONTHS_3: "MONTHS_3",
  MONTHS_6: "MONTHS_6",
  YEARS_1: "YEARS_1",
  YEARS_5: "YEARS_5",
  MAX: "MAX",
};

const CurrencyControls = ({ startAt, endAt, setStartAt, setEndAt }) => {
  const updateDate = (period) => {
    const today = moment().format("YYYY-MM-DD");
    switch (period) {
      case buttons.MONTHS_1:
        setStartAt(moment().subtract(1, "months").format("YYYY-MM-DD"));
        setEndAt(today);
        break;
      case buttons.MONTHS_3:
        setStartAt(moment().subtract(3, "months").format("YYYY-MM-DD"));
        setEndAt(today);
        break;
      case buttons.MONTHS_6:
        setStartAt(moment().subtract(6, "months").format("YYYY-MM-DD"));
        setEndAt(today);
        break;
      case buttons.YEARS_1:
        setStartAt(moment().subtract(1, "years").format("YYYY-MM-DD"));
        setEndAt(today);
        break;
      case buttons.YEARS_5:
        setStartAt(moment().subtract(5, "years").format("YYYY-MM-DD"));
        setEndAt(today);
        break;
      case buttons.MAX:
        setStartAt("1999-01-04");
        setEndAt(today);
        break;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3>Select period</h3>
        <ButtonGroup aria-label="Date period">
          <Button onClick={updateDate.bind(null, buttons.MONTHS_1)}>1M</Button>
          <Button onClick={updateDate.bind(null, buttons.MONTHS_3)}>3M</Button>
          <Button onClick={updateDate.bind(null, buttons.MONTHS_6)}>6M</Button>
          <Button onClick={updateDate.bind(null, buttons.YEARS_1)}>1R</Button>
          <Button onClick={updateDate.bind(null, buttons.YEARS_5)}>5L</Button>
          <Button onClick={updateDate.bind(null, buttons.MAX)}>Max</Button>
        </ButtonGroup>
      </div>
      <h3>Custom</h3>
      <Form className="mb-4">
        <Form.Label>startAt</Form.Label>
        <Form.Control
          onChange={(e) => setStartAt(e.target.value)}
          value={startAt}
          type="date"
          name="startAt"
        />
        <Form.Label>endAt</Form.Label>
        <Form.Control
          onChange={(e) => setEndAt(e.target.value)}
          value={endAt}
          type="date"
          name="endAt"
        />
      </Form>
    </>
  );
};

export default CurrencyControls;
