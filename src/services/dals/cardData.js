import { formatData } from '../../utils/helper';
import { setCacheData, getCacheData } from '../cache/cacheCardData';
import { fetchData } from './dataFetchService';
import { API_END_POINT, CACHE_KEY_NAME, PAGE_SIZE } from '../../utils/constant';

const constructUrl = (input, page) => {
  return input.length > 0
    ? `${API_END_POINT}?name=${input}&pageSize=${PAGE_SIZE}&page=${page}`
    : `${API_END_POINT}?pageSize=${PAGE_SIZE}&page=${page}`;
};

//check to see if cache data exists for the given page.
export const retriveData = async (searchValue, page) => {
  const url = constructUrl(searchValue, page);
  const cards = await getCacheData(CACHE_KEY_NAME);
  let cachedData;

  //Search thru LocalStorage first when input search occuurs.
  if (searchValue.length === 0) {
    // cachedData = cards.filter((card) => card.name.includes(searchValue));
    //if no input search, just try to retrive data from LS first
    cachedData = cards.filter((card) => card.page === page);
    if (cachedData.length > 0) {
      return cachedData;
    }
  }

  try {
    const cardData = await fetchData(url);
    const formattedData = formatData(cardData, page);
    //Not to saveoff the data when input search occurs.
    if (searchValue.length > 0) {
      return formattedData;
    }
    setCacheData(CACHE_KEY_NAME, formattedData);
    return formattedData;
  } catch {
    return new Error('Encountred with upstream API issue');
  }
};
