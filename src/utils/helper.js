//Format the data as UI expect to see.
const formatData = ({ cards }, page) => {
  return cards.map(({ imageUrl, set, name, type, text, id }) => {
    const { name: setName } = set;
    return { imageUrl, setName, name, type, text, id, page: page };
  });
};

//Remove dups. This cabn be to prevent any duplicate data.
const removeDuplicate = (objectArray, propertyName) => {
  return objectArray.filter(
    (ele, i) =>
      objectArray.findIndex(
        (obj) => obj[propertyName] === ele[propertyName]
      ) === i
  );
};

export { formatData, removeDuplicate };
