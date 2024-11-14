import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MemberPage.css';

function MemberPage({ lists = {}, setLists }) {
  const { listId } = useParams();
  const [newItem, setNewItem] = useState('');

  const userName = "Alice";

  const memberLists = Object.keys(lists).filter(
    (list) => lists[list]?.members?.includes(userName)
  );

  const items = lists[listId]?.items || [];

  const handleAddItem = () => {
    if (newItem.trim() && listId && typeof setLists === 'function') {
      const updatedItems = [...items, { name: newItem, resolved: false }];
      setLists({
        ...lists,
        [listId]: { ...lists[listId], items: updatedItems }
      });
      setNewItem('');
    }
  };

  const handleToggleItem = (index) => {
    if (listId && typeof setLists === 'function') {
      const updatedItems = items.map((item, i) =>
        i === index ? { ...item, resolved: !item.resolved } : item
      );
      setLists({
        ...lists,
        [listId]: { ...lists[listId], items: updatedItems }
      });
    }
  };

  const handleLeaveList = () => {
    if (listId && lists[listId]?.members && typeof setLists === 'function') {
      const updatedMembers = lists[listId].members.filter((member) => member !== userName);
      setLists({
        ...lists,
        [listId]: { ...lists[listId], members: updatedMembers }
      });
    }
  };

  return (
    <div className="app">
      <div className="main-container">
        <div className="sidebar">
          <h2>Your Lists</h2>
          {memberLists.map((list) => (
            <div key={list}>
              <button 
                className={listId === list ? 'selected' : ''} 
                onClick={() => window.location.href = `/member/${list}`}
              >
                {list}
              </button>
            </div>
          ))}
        </div>

        <div className="shopping-list">
          <h2>{listId || 'Select a List'}</h2>
          {listId && (
            <>
              <button onClick={handleLeaveList} className="leave-button">
                Leave List
              </button>
              <ul>
                {items.map((item, index) => (
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
                className="owner-input"
              />
              <button onClick={handleAddItem} className="add-button">
                Add Item
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
