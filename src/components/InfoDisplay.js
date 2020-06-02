import React from 'react';

export const InfoDisplay = ({
  type,
  error = false,
  loading = false,
  results = 1,
  scroll = false,
}) => {
  const componentClass =
    type === 'warn' ? 'info-title-warn' : 'info-title-error';
  let message;

  if (error) {
    message = error;
  } else if (results === 0 && !loading) {
    message = 'No card found';
  } else if (scroll) {
    message = `*** End of the Page ***`;
  } else {
    message = '';
  }

  return <div className={`info-title ${componentClass}`}>{message}</div>;
};
