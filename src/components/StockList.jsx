import { useState, useEffect } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import finnHub from "../apis/finnHub";

/* eslint-disable no-unused-vars */
function StockList() {
  const [stock, setStock] = useState();
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const changeIcon = (change) => {
    return change > 0 ? <BsArrowUpShort /> : <BsArrowDownShort />;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stockName) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stockName,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);

        if (isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error);
      }
      isMounted = false;
    };
    fetchData();
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock ? (
            stock.map((stockData) => {
              return (
                <tr className="table-row" key={stockData.symbol}>
                  <th scope="row">{stockData.symbol}</th>
                  <td>{stockData.data.c}</td>
                  <td className={`text-${changeColor(stockData.data.d)}`}>
                    {stockData.data.d}
                    {changeIcon(stockData.data.d)}
                  </td>
                  <td className={`text-${changeColor(stockData.data.dp)}`}>
                    {stockData.data.dp}
                    {changeIcon(stockData.data.dp)}
                  </td>
                  <td>{stockData.data.h}</td>
                  <td>{stockData.data.l}</td>
                  <td>{stockData.data.o}</td>
                  <td>{stockData.data.pc}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading..</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
