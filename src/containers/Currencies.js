import React, { useState, useEffect } from "react";

import CurrencyTable from "./CurrencyTable";
import CurrencyChart from "./CurrencyChart";

import CurrencyButtons from "../components/Currency/CurrencyControls";
import CurrencyBaseDropdown from "../components/Currency/CurrencyBaseDropdown";
import CurrencyCheckboxs from "../components/Currency/CurrencyCheckboxs";

import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";

import { Row, Col, Container } from "react-bootstrap";

import moment from "moment";
import axios from "../axios";

const fetchAvailableCurrencies = async (setError) => {
  const response = await axios.get(`/latest`);

  const { rates } = response.data;

  const currencies = Object.keys(rates);

  return currencies;
};

const fetchHistoryData = async (startAt, endAt, base, selectedCurrencies) => {
  if (selectedCurrencies.length <= 0) {
    return [];
  }
  const response = await axios.get(
    `/history?start_at=${startAt}&end_at=${endAt}&base=${base}&symbols=${selectedCurrencies.toString()}`
  );

  const data = response.data.rates;
  const parseData = {};
  const dates = Object.keys(data);
  dates.forEach((date) => {
    parseData[date] = data[date];
  });
  return parseData;
};

const Currencies = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [history, setHistory] = useState([]);
  const today = moment(new Date()).format("YYYY-MM-DD");
  const [startAt, setStartAt] = useState("2019-04-01");
  const [endAt, setEndAt] = useState(today);
  const [base, setBase] = useState("EUR");
  const [selectedCurrencies, setSelectedCurrencies] = useState(["PLN"]);

  useEffect(() => {
    fetchAvailableCurrencies(setError)
      .then((data) => {
        setAvailableCurrencies(data);
        setLoading(false);
      })
      .catch((err) => setError("Server error"));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchHistoryData(startAt, endAt, base, selectedCurrencies)
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = `Symbols '${selectedCurrencies.toString()}' are invalid.`;
        if (err.response || err.response.data.error === errorMessage) {
          setError(
            `No historical data reduce the time period or remove the last currency.`
          );
        } else {
          setError("Server error");
        }
        setLoading(false);
        return [];
      });
  }, [base, startAt, endAt, selectedCurrencies]);

  const selectCurrency = (name) => {
    let parseCurrencies = [...selectedCurrencies];

    const index = parseCurrencies.findIndex((item) => item === name);

    if (index !== -1) {
      parseCurrencies = parseCurrencies.filter((item) => item !== name);
    } else {
      parseCurrencies.push(name);
    }

    setSelectedCurrencies(parseCurrencies);
  };

  return (
    <Container fluid>
      <LoadingSpinner show={loading} />
      <ErrorModal
        show={error ? true : false}
        error={error}
        onClose={() => setError(null)}
      />
      <h1>Currencies</h1>
      <Row>
        <Col lg="8">
          <CurrencyChart history={history} />
        </Col>
        <Col lg="4" className="my-4">
          <Row>
            <Col>
              <CurrencyBaseDropdown
                availableCurrencies={availableCurrencies}
                base={base}
                setBase={setBase}
              />
              <CurrencyButtons
                startAt={startAt}
                endAt={endAt}
                setStartAt={setStartAt}
                setEndAt={setEndAt}
              />
            </Col>
            <Col>
              <CurrencyCheckboxs
                availableCurrencies={availableCurrencies}
                selectedCurrencies={selectedCurrencies}
                selectCurrency={selectCurrency}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <CurrencyTable history={history} />
    </Container>
  );
};

export default Currencies;
