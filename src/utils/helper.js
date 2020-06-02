//Format the data as UI expect to see.
const formatData = ({ cards, _links: { next = '' } = {} }, page) => {
  return cards.map(
    ({ imageUrl, set: { name: setName }, name, type, text, id }) => {
      return { imageUrl, setName, name, type, text, id, page, next };
    }
  );
};

//Remove duplicate data. This will be used to prevent any duplicate data.
const removeDuplicate = (objectArray, propertyName) => {
  return objectArray.filter(
    (ele, i) =>
      objectArray.findIndex(
        (obj) => obj[propertyName] === ele[propertyName]
      ) === i
  );
};

export { formatData, removeDuplicate };
