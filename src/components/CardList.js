import React from 'react';
import { Card } from '../components/Card';

export const CardList = ({ cards }) => {
  return (
    <div className="cards">
      {cards.map((item, index) => {
        return (
          <div key={index} className="card">
            <Card info={item} />
          </div>
        );
      })}
    </div>
  );
};
