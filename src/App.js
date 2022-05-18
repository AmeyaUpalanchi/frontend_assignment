import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import "./app.css";
import { SearchBar } from "./components";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [noData, setNoData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isQueryValid, setQueyValidity] = useState(true);

  const isEmpty = !data || data.length === 0;

  const handleChange = (event) => {
    const text = event.target.value;

    const checkUserInput = (text) => {
      if (text.length < 3) {
        setQueyValidity(false);
      } else if (text.trim() == "") {
        setQueyValidity(false);
      } else {
        setQuery(text);
      }
    };

    checkUserInput(text);
  };

  const getQueryURL = (query) => {
    const url = `https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=${query}`;

    return encodeURI(url);
  };

  const getData = async () => {
    if (!query || query.trim() === "") return;

    setLoading(true);
    setNoData(false);

    const URL = getQueryURL(query);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      if (response.data && response.data.length === 0) setNoData(true);

      const topResult = response.data.data.result.slice(0, 5);

      setData(topResult);
    }
    setLoading(false);
  };

  const dataChange = debounce(() => getData(), 100);

  useEffect(() => {
    dataChange();
  }, [query]);

  return (
    <div className="app-container">
      <SearchBar
        isLoading={isLoading}
        data={data}
        hasNoData={isEmpty}
        onChange={handleChange}
        value={query}
      />
    </div>
  );
};

export default App;
