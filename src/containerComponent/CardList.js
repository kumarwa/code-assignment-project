import React, { useState, useEffect } from 'react';
import useInfiniteScroll from '../hooks/useInfinteScroll';

import { Card } from '../components/Card';
import { Info } from '../components/Info';
import { Loader } from '../components/Loader';
import { SearchBar } from '../components/SearchBar';
import { retriveData } from '../services/dals/cardData';

function CardList() {
  //set state of the app
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [, setIsFetching] = useInfiniteScroll(fetchMoreData);

  //fetch data
  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await retriveData(input, page);
      setResults([...results, ...data]);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  //handle input change
  const handleChange = (event) => {
    setInput(event.target.value);
    setResults([]);
  };

  //Load data once during app bootstarp.
  useEffect(() => {
    setPage(1);
    loadData();
  }, [input]);

  //Gte more data when scroll occurs.
  function fetchMoreData() {
    setIsFetching(false);
    setPage((prePage) => prePage + 1);
    loadData();
  }

  return (
    <>
      <div>
        <SearchBar input={input} onChangeHandle={handleChange} />
      </div>

      {results.length === 0 && (
        <Info type={'warn'} message={'No data found..'} />
      )}

      {error && <Info type={'error'} message={'Error Encountered..'} />}

      <div className="cards">
        {results.map((item, index) => {
          return (
            <div key={index} className="card">
              <Card info={item} />
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="loading-container">
          <Loader />
        </div>
      )}
    </>
  );
}

export default CardList;
