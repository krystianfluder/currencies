import React, { useState } from "react";
import { v4 } from "uuid";
import { ITEMS_IN_TABLE } from "../env";
import Table from "../components/Currency/CurrencyTable";

const splitHistory = (history) => {
  const dates = Object.keys(history);

  dates.sort((a, b) => new Date(b) - new Date(a));

  const parsed = [];
  let obj = {};

  let counter = 0;
  dates.forEach((date) => {
    counter += 1;
    obj[date] = history[date];

    if (counter === ITEMS_IN_TABLE) {
      parsed.push(obj);
      obj = {};
      counter = 0;
    }
  });

  parsed.push(obj);

  return parsed;
};

const createPage = (history) => {
  const dates = Object.keys(history);
  const tbody = [];
  const thead = ["DATE"];
  const index = dates[dates.length - 1];
  if (index) {
    Object.keys(history[index]).forEach((currency) => {
      thead.push(currency);
    });
  }
  dates.forEach((date) => {
    const linePrices = [];
    Object.values(history[date]).forEach((item) => {
      linePrices.push({
        text: item,
        id: v4(),
      });
    });
    tbody.push({
      date,
      prices: linePrices,
    });
  });
  return {
    thead,
    tbody,
  };
};

const CurrecyTable = React.memo(({ history }) => {
  const dates = Object.keys(history);
  const pages = Math.ceil(dates.length / ITEMS_IN_TABLE);
  const [page, setPage] = useState(pages);

  const parsed = splitHistory(history);

  const { thead, tbody } = createPage(parsed[page]);

  const prevPage = () => {
    setPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const nextPage = () => {
    setPage((prev) => {
      if (prev < pages - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  return (
    <Table
      pages={pages}
      page={page}
      setPage={setPage}
      prevPage={prevPage}
      nextPage={nextPage}
      thead={thead}
      tbody={tbody}
    />
  );
});

export default CurrecyTable;
