import React from 'react';
import '../styles/ShoppingList.css';

function ShoppingList({ items, onToggle }) {
  return (
    <div className="shopping-list">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="shopping-item">
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => onToggle(index)}
            />
            <span className={item.bought ? 'bought' : ''}>{item.name}</span>
            <button className="delete-item">-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
