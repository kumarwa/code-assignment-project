import React, { useState, useEffect, useRef } from 'react';
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
  const [moreScroll, setMoreScroll] = useState(true);
  const [, setIsFetching] = useInfiniteScroll(fetchMoreData);
  const [endOfPage, setEndOfPage] = useState(false);

  const page = useRef(0);

  //fetch data
  const loadData = async () => {
    setEndOfPage(false);
    setLoading(true);
    setError(false);
    try {
      const data = await retriveData(input, page.current);
      setResults([...results, ...data]);
      const { next = '' } = data.length > 0 ? data[0] : [];
      checkForMoreToScroll(next);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const checkForMoreToScroll = (hasMoreRecords) => {
    const isMoreScroll = hasMoreRecords.length > 0 ? true : false;
    setMoreScroll(isMoreScroll);
  };

  //handle input change
  const handleChange = (event) => {
    setInput(event.target.value);
    setResults([]);
  };

  //Load data once during app bootstarp.
  useEffect(() => {
    page.current = 1;
    loadData();
  }, [input]);

  //Gte more data when scroll occurs.
  function fetchMoreData() {
    setIsFetching(false);
    if (!moreScroll) {
      setEndOfPage(true);
      return;
    }
    setEndOfPage(false);
    page.current++;
    loadData();
  }

  return (
    <>
      <div>
        <SearchBar input={input} onChangeHandle={handleChange} />
      </div>

      {results.length === 0 && !loading && (
        <Info type={'warn'} message={'No results found'} />
      )}

      {error && <Info type={'error'} message={'Error Encountered'} />}

      <div className="cards">
        {results.map((item, index) => {
          return (
            <div key={index} className="card">
              <Card info={item} />
            </div>
          );
        })}
      </div>

      {endOfPage && <Info type={'warn'} message={'*** END OF PAGE ***'} />}

      {loading && (
        <div className="loading-container">
          <Loader />
        </div>
      )}
    </>
  );
}

export default CardList;
