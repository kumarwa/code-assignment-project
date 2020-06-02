import React from 'react';

export const Loader = ({ loading }) => {
  return (
    <div className="loading-container">
      {loading && <div className="loader"></div>}
    </div>
  );
};
