
import React, { useState } from 'react';
import '../styles/MemberPage.css';

function MemberPage() {
  const [items, setItems] = useState([
    { name: 'Milk', resolved: false },
    { name: 'Bread', resolved: false },
  ]);

  const handleToggleItem = (index) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, resolved: !item.resolved } : item
    ));
  };

  const handleLeaveList = () => {
    alert("You've left the list.");
  };

  return (
    <div className="member-container">
      <h2>Member's Shopping List</h2>
      <ul className="member-item-list">
        {items.map((item, index) => (
          <li key={index} className={`member-item ${item.resolved ? 'resolved' : ''}`}>
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
      <button onClick={handleLeaveList} className="leave-button">Leave List</button>
    </div>
  );
}

export default MemberPage;
