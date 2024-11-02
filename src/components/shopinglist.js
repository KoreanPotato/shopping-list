import React from 'react';
import '../styles/ShoppingList.css';


function ShoppingList({ items, onToggle, onDelete, currentUser }) {
  return (
    <div className="shopping-list">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="shopping-item">
            <label>
              <input
                type="checkbox"
                checked={item.resolved}
                onChange={() => onToggle(index)}
              />
              <span className={item.resolved ? 'resolved' : ''}>{item.name}</span>
            </label>
            {currentUser.role === 'owner' && (
              <button onClick={() => onDelete(index)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
