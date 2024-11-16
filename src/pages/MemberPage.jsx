import React, { useState, useEffect } from 'react';

function MemberPage() {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('memberLists');
    return savedLists
      ? JSON.parse(savedLists)
      : {
        Tesco: {
          items: [
            { name: 'Milk', resolved: false },
            { name: 'Bread', resolved: true }
          ]
        },
        DM: {
          items: [
            { name: 'Soap', resolved: false },
            { name: 'Brush', resolved: false }
          ]
        },}
  });
  const [currentList, setCurrentList] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    localStorage.setItem('memberLists', JSON.stringify(lists));
  }, [lists]);

  const handleSelectList = (listName) => {
    setCurrentList(listName);
  };

  const handleAddItem = () => {
    if (newItem.trim() && currentList) {
      const updatedItems = [...lists[currentList].items, { name: newItem, resolved: false }];
      setLists({
        ...lists,
        [currentList]: { ...lists[currentList], items: updatedItems }
      });
      setNewItem('');
    }
  };

  const handleToggleItem = (index) => {
    if (currentList) {
      const updatedItems = lists[currentList].items.map((item, i) =>
        i === index ? { ...item, resolved: !item.resolved } : item
      );
      setLists({
        ...lists,
        [currentList]: { ...lists[currentList], items: updatedItems }
      });
    }
  };

  const handleLeaveList = () => {
    if (currentList) {
      const updatedLists = { ...lists };
      delete updatedLists[currentList];
      setLists(updatedLists);
      setCurrentList(null);
    }
  };

  
  const getFilteredItems = () => {
    const items = lists[currentList]?.items || [];
    if (filter === 'all') {
      return items;
    } else if (filter === 'unresolved') {
      return items.filter((item) => !item.resolved);
    }
  };

  return (
    <div className="app">
      <div className="main-container">
        <div className="sidebar">
          <h2>Your Lists</h2>
          {Object.keys(lists).map((listName) => (
            <button
              key={listName}
              onClick={() => handleSelectList(listName)}
              className={currentList === listName ? 'selected' : ''}
            >
              {listName}
            </button>
          ))}
        </div>

        <div className="shopping-list">
          {currentList ? (
            <>
              <h2>{currentList}</h2>
              <button onClick={handleLeaveList} className="leave-button">
                Leave List
              </button>

              <div className="filter-buttons">
                <button
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'active-filter' : ''}
                >
                  Show All
                </button>
                <button
                  onClick={() => setFilter('unresolved')}
                  className={filter === 'unresolved' ? 'active-filter' : ''}
                >
                  Show Unresolved
                </button>
              </div>

              <ul>
                {getFilteredItems().map((item, index) => (
                  <li key={index} className="shopping-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={item.resolved}
                        onChange={() => handleToggleItem(index)}
                      />
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
              />
              <button onClick={handleAddItem} className="add-button">
                Add Item
              </button>
            </>
          ) : (
            <h2>Select a List</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
