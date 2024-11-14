import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/OwnerPage.css';

function OwnerPage() {
  const { listId } = useParams();
  const [lists, setLists] = useState({
    Tesco: {
      items: [
        { name: 'Milk', resolved: true }, 
        { name: 'Bread', resolved: true }, 
        { name: 'Eggs 10pc', resolved: false }, 
        { name: 'Meat beef 3 kg', resolved: false }, 
        { name: 'Water 5l', resolved: false }
      ],
      members: []
    },
    DM: {
      items: [
        { name: 'Soap', resolved: false }, 
        { name: 'Brush', resolved: false },
        { name: 'Shampoo', resolved: false }
      ],
      members: []
    },
    Smarty: {
      items: [
        { name: 'Phone charger', resolved: false }, 
        { name: 'Zelda nintendo', resolved: false }
      ],
      members: []
    }
  });

  const [newListName, setNewListName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const [selectedMember, setSelectedMember] = useState('');
  const membersList = ['Alice', 'Bob', 'Charlie', 'David'];

  const items = lists[listId]?.items || [];
  const members = lists[listId]?.members || [];

  const handleAddList = () => {
    if (newListName.trim() && !lists[newListName]) {
      setLists({
        ...lists,
        [newListName]: { items: [], members: [] }
      });
      setNewListName('');
      setIsAddModalOpen(false);
    }
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, { name: newItem, resolved: false }];
      setLists({
        ...lists,
        [listId]: { ...lists[listId], items: updatedItems }
      });
      setNewItem('');
    }
  };

  const handleToggleItem = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, resolved: !item.resolved } : item
    );
    setLists({
      ...lists,
      [listId]: { ...lists[listId], items: updatedItems }
    });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setLists({
      ...lists,
      [listId]: { ...lists[listId], items: updatedItems }
    });
  };

  const openDeleteModal = (list) => {
    setListToDelete(list);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteList = () => {
    if (listToDelete) {
      const updatedLists = { ...lists };
      delete updatedLists[listToDelete];
      setLists(updatedLists);
      setListToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddMember = () => {
    if (selectedMember && !members.includes(selectedMember)) {
      const updatedMembers = [...members, selectedMember];
      setLists({
        ...lists,
        [listId]: { ...lists[listId], members: updatedMembers }
      });
      setSelectedMember('');
      setIsAddMemberModalOpen(false);
    }
  };

  const filteredItems = items.filter(
    (item) => filter === 'all' || (filter === 'unresolved' && !item.resolved)
  );

  return (
    <div className="app">
      <div className="main-container">
        <div className="sidebar">
          <h2>Shopping List</h2>
          {Object.keys(lists).map((list) => (
            <div key={list} style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={`/list/${list}`}>
                <button className={listId === list ? 'selected' : ''}>{list}</button>
              </Link>
              <button onClick={() => openDeleteModal(list)} className="delete-button">
                &#x2716;
              </button>
            </div>
          ))}
          <button onClick={() => setIsAddModalOpen(true)} className="add-button">
            Create List
          </button>
        </div>

        <div className="shopping-list">
          <h2>{listId || 'Select a List'}</h2>
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
                <button onClick={() => handleDeleteItem(index)} className="delete-button">
                  &#x2716;
                </button>
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

          <button onClick={() => setIsAddMemberModalOpen(true)} className="add-button">
            Add Member
          </button>

          <h3>Members:</h3>
          <ul>
            {members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Shopping List</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
            />
            <button onClick={handleAddList} className="add-member-button">
              Add List
            </button>
            <button onClick={() => setIsAddModalOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the list "{listToDelete}"?</p>
            <button onClick={confirmDeleteList} className="delete-confirm-button">
              Confirm
            </button>
            <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isAddMemberModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Member to Add</h3>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="member-select"
            >
              <option value="" disabled>
                Choose a member
              </option>
              {membersList.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
            <button onClick={handleAddMember} className="add-member-button">
              Add Member
            </button>
            <button onClick={() => setIsAddMemberModalOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerPage;
