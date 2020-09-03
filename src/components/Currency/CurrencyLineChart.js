import React, { memo } from "react";
import { Line } from "react-chartjs-2";

const CurrencyLineChart = memo(({ data }) => {
  return <Line data={data} options={{ responsive: true }} />;
});

export default CurrencyLineChart;
