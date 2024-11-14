import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MemberPage.css';

function MemberPage({ lists = {}, setLists }) {
  const { listId } = useParams();
  const navigate = useNavigate();
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
    } else {
      console.warn("List ID or setLists function is not available.");
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
    } else {
      console.warn("List ID or setLists function is not available.");
    }
  };

  const handleLeaveList = () => {
    if (listId && lists[listId]?.members && typeof setLists === 'function') {
      const updatedMembers = lists[listId].members.filter((member) => member !== userName);
      setLists({
        ...lists,
        [listId]: { ...lists[listId], members: updatedMembers }
      });
      navigate('/member'); // Вернем пользователя на главную страницу мембера после выхода из списка
    } else {
      console.warn("List ID, members, or setLists function is not available.");
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
                onClick={() => navigate(`/member/${list}`)}
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
