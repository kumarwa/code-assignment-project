//Get cached data for given key.
export const getCacheData = async (key) => {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify([]));
};

//Check to see if the cached data exist for given key.
export const isCacheExists = async (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data.length > 0;
};

//Set the cache data based for given key.
export const setCacheData = async (key, value) => {
  var data = await getCacheData(key);
  return localStorage.setItem(key, JSON.stringify([...value, ...data]));
};

//Remove cached from locatStorage for given key
export const removeCacheData = async (key) => {
  return localStorage.removeItem(key);
};
