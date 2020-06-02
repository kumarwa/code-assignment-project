import React, { useState, useEffect, useRef } from 'react';
import useInfiniteScroll from '../hooks/useInfinteScroll';
import { WARN, ERROR } from '../utils/constant';

import { CardList } from '../components/CardList';
import { InfoDisplay } from '../components/InfoDisplay';
import { Loader } from '../components/Loader';
import { SearchBar } from '../components/SearchBar';
import { retriveData } from '../services/dals/cardData';

function CardDisplay() {
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
      <SearchBar input={input} onChangeHandle={handleChange} />
      <InfoDisplay type={WARN} results={results.length} loading={loading} />
      <InfoDisplay type={ERROR} error={error} />
      <CardList cards={results} />
      <InfoDisplay type={WARN} scroll={endOfPage} />
      <Loader loading={loading} />
    </>
  );
}

export default CardDisplay;
