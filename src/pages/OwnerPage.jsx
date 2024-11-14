import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/OwnerPage.css';

function OwnerPage() {
  const { listId } = useParams(); 
  const [listName, setListName] = useState('');
  

  const [items, setItems] = useState({
    Tesco: [{ name: 'Milk', resolved: false }, { name: 'Bread', resolved: false }],
    DM: [],
    List3: [],
    List4: [],
    List5: []
  });
  
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    setListName(listId || 'My Shopping List');
  }, [listId]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems({
        ...items,
        [listId]: [...(items[listId] || []), { name: newItem, resolved: false }]
      });
      setNewItem('');
    }
  };

  const handleToggleItem = (index) => {
    const updatedItems = items[listId].map((item, i) => 
      i === index ? { ...item, resolved: !item.resolved } : item
    );
    setItems({ ...items, [listId]: updatedItems });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items[listId].filter((_, i) => i !== index);
    setItems({ ...items, [listId]: updatedItems });
  };

  const filteredItems = (items[listId] || []).filter(
    (item) => filter === 'all' || (filter === 'unresolved' && !item.resolved)
  );

  return (
    <div className="owner-container">
      <div className="sidebar">
        <h2>Shopping List</h2>
        <Link to="/list/Tesco">
          <button className={listId === 'Tesco' ? 'selected' : ''}>Tesco</button>
        </Link>
        <Link to="/list/DM">
          <button className={listId === 'DM' ? 'selected' : ''}>DM</button>
        </Link>
        <Link to="/list/List3">
          <button className={listId === 'List3' ? 'selected' : ''}>List 3</button>
        </Link>
        <Link to="/list/List4">
          <button className={listId === 'List4' ? 'selected' : ''}>List 4</button>
        </Link>
        <Link to="/list/List5">
          <button className={listId === 'List5' ? 'selected' : ''}>List 5</button>
        </Link>
        <button className="add-button">add list</button>
        <button className="new-member-button">new member</button>
      </div>

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
