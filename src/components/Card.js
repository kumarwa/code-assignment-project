import React from 'react';

export const Card = (props) => {
  const { imageUrl, setName, name, text, type } = props.info;
  return (
    <div className="card-outer-container">
      <img src={imageUrl} alt={setName} />
      <div className="card-inner-container">
        <h3>{name}</h3>
        <div>
          <p>{type}</p>
          <p>{text}</p>
          <p>{setName}</p>
        </div>
      </div>
    </div>
  );
};
