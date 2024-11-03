
import React, { useState } from 'react';
import '../styles/OwnerPage.css';

function OwnerPage() {
  const [listName, setListName] = useState('My Shopping List');
  const [items, setItems] = useState([{ name: 'Milk', resolved: false }, { name: 'Bread', resolved: false }]);
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { name: newItem, resolved: false }]);
      setNewItem('');
    }
  };

  const handleToggleItem = (index) => {
    setItems(items.map((item, i) => (i === index ? { ...item, resolved: !item.resolved } : item)));
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const filteredItems = items.filter(
    (item) => filter === 'all' || (filter === 'unresolved' && !item.resolved)
  );

  return (
    <div className="owner-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Shopping List</h2>
        <button className="selected">Tesco</button>
        <button>DM</button>
        <button>List 3</button>
        <button>List 4</button>
        <button>List 5</button>
        <button className="add-button">add list</button>
        <button className="new-member-button">new member</button>
      </div>

      {/* Shopping List */}
      <div className="shopping-list">
        <h2>{listName}</h2>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} className="shopping-item">
              <label>
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => handleToggleItem(index)}
                />
                {item.name}
              </label>
              <button onClick={() => handleDeleteItem(index)} className="delete-button">−</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="owner-input"
        />
        <button onClick={handleAddItem} className="add-button">Add Item</button>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>Show All</button>
          <button onClick={() => setFilter('unresolved')}>Show Unresolved</button>
        </div>
      </div>
    </div>
  );
}

export default OwnerPage;
