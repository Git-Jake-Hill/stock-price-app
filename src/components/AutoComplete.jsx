/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

function AutoComplete() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          curser: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li key={result.symbol} className="dropdown-item">
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response);
        console.log(isMounted);
        if (isMounted) {
          setResults(response.data.result);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ backgroundColor: "rgb(145, 158, 171, 0.04)" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {renderDropdown()}
      </div>
      <form />
    </div>
  );
}

export default AutoComplete;

// crate a input to search
// input html element

// onChange update search input
// send fetch request to api for company names autocomplete

// once company is selected
// add it to the watchList to update the table data
