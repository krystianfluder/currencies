import React, { memo, useRef } from "react";
import { THROTTLE_VALUE } from "../env";
import CurrencyLineChart from "../components/Currency/CurrencyLineChart";

import { Button } from "react-bootstrap";

import { randomRgba } from "../utils/colors";

const parseLineDate = (history) => {
  const currencies = {};

  let first = true;

  const labels = Object.keys(history);

  labels.sort((a, b) => new Date(a) - new Date(b));

  labels.forEach((date) => {
    const keys = Object.keys(history[date]);
    if (keys.length > 0) {
      if (first) {
        keys.forEach((key) => {
          currencies[key] = [{ value: history[date][key], date }];
        });
        first = false;
      } else {
        keys.forEach((key) => {
          currencies[key].push({ value: history[date][key], date });
        });
      }
    }
  });

  const currenciesKeys = Object.keys(currencies);
  const datasets = [];
  currenciesKeys.forEach((currency) => {
    const data = currencies[currency].map((item) => item.value);
    const color = randomRgba();
    datasets.push({
      label: currency,
      backgroundColor: color,
      borderColor: color,
      data,
    });
  });

  return {
    labels,
    datasets,
  };
};

const throttleHistory = (history) => {
  const keys = Object.keys(history);
  const div = Math.ceil(keys.length / THROTTLE_VALUE);
  let counter = 0;
  const parseData = {};
  keys.forEach((key) => {
    if (counter === div) {
      parseData[key] = history[key];
      counter = 0;
    } else {
      counter += 1;
    }
  });
  return parseData;
};

const CurrencyChart = memo(({ history }) => {
  const ref = useRef(null);

  const parseHistory = throttleHistory(history);
  const data = parseLineDate(parseHistory);

  const download = () => {
    const canvas = ref.current.querySelector("canvas");
    const a = ref.current.querySelector("a");
    const url = canvas.toDataURL("image/png");
    a.href = url;
    a.download = "chart.png";
  };

  return (
    <div ref={ref}>
      <CurrencyLineChart data={data} />
      <Button variant="link" href="/" onClick={download}>
        Download
      </Button>
    </div>
  );
});

export default CurrencyChart;
