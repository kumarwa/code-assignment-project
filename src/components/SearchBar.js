import React from 'react';

export const SearchBar = ({ onChangeHandle, input }) => {
  return (
    <input
      placeholder="Search by card name...."
      value={input}
      onChange={onChangeHandle}
    />
  );
};
