import { useState, useEffect } from 'react';

const useInfiniteScroll = (fetchMoreData) => {
  const [isFetching, setIsFetching] = useState(false);
  //set window scrolling event
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      ) {
        return;
      }
      setIsFetching(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //fetch more data when scrolls.
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching, fetchMoreData]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
