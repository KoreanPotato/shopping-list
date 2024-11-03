import React, { useState } from 'react';
import '../styles/Sidebar.module.css'

function Sidebar({ lists, selectedList, setSelectedList, currentUser, onAddMember, onRemoveMember, onRenameList }) {
  const [newMember, setNewMember] = useState('');
  const [newListName, setNewListName] = useState(selectedList);

  return (
    <div className="sidebar">
      <h2>Shopping List</h2>
      {lists.map((list) => (
        <button key={list} onClick={() => setSelectedList(list)} className={selectedList === list ? 'selected' : ''}>
          {list}
        </button>
      ))}

      {currentUser.role === 'owner' && (
        <div>
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onBlur={() => onRenameList(newListName)}
            placeholder="Rename list"
          />
        </div>
      )}

      <h3>Members</h3>
      <ul>
        {lists.map((member, index) => (
          <li key={index}>
            {member}
            {currentUser.role === 'owner' && (
              <button onClick={() => onRemoveMember(member)}>Remove</button>
            )}
          </li>
        ))}
      </ul>

      {currentUser.role === 'owner' && (
        <div>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Add member"
          />
          <button onClick={() => { onAddMember(newMember); setNewMember(''); }}>Add Member</button>
        </div>
      )}

      {currentUser.role === 'member' && (
        <button onClick={() => onRemoveMember(currentUser.name)}>Leave List</button>
      )}
    </div>
  );
}

export default Sidebar;
