import React, { memo } from "react";
import { Table, Pagination } from "react-bootstrap";

const CurrencyTable = memo(
  ({ pages, page, setPage, prevPage, nextPage, thead, tbody }) => {
    return (
      <div className="my-4">
        <div className="my-4">
          <h2>Table</h2>
          <h3>Total pages: {pages}</h3>
        </div>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              {thead.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                {item.prices.map((currency) => (
                  <td key={currency.id}>{JSON.stringify(currency.text)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {pages && pages > 1 ? (
          <Pagination className="d-flex align-items-center justify-content-center">
            <Pagination.First onClick={() => setPage(0)} />
            <Pagination.Prev onClick={prevPage} />
            <Pagination.Ellipsis />

            <Pagination.Item active>{page + 1}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={() => setPage(pages - 1)} />
          </Pagination>
        ) : null}
      </div>
    );
  }
);

export default CurrencyTable;
