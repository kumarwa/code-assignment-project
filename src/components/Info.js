import React from 'react';

export const Info = ({ message, type }) => {
  const componentClass =
    type === 'warn' ? 'info-title-warn' : 'info-title-error';
  return <div className={`info-title ${componentClass}`}>{message}</div>;
};
