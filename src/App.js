import Header from './components/header';
import Sidebar from './components/sidebar';
import ShoppingList from './components/shopinglist';
import Footer from './components/footer';
import React, { useState } from "react";
import './styles/app.css';

function App() {
  const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Alice', role: 'owner' });

  const [listName, setListName] = useState('My Shopping List');
  const [members, setMembers] = useState(['Alice', 'Bob']);
  const [items, setItems] = useState([
    { name: 'Milk', resolved: false },
    { name: 'Bread', resolved: false },
  ]);
  const [filter, setFilter] = useState('all'); // Фильтр для показа всех или только нерешенных элементов

  const handleAddItem = (itemName) => {
    setItems([...items, { name: itemName, resolved: false }]);
  };

  const handleToggleItem = (index) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, resolved: !item.resolved } : item
    );
    setItems(newItems);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleAddMember = (memberName) => {
    if (currentUser.role === 'owner') {
      setMembers([...members, memberName]);
    }
  };

  const handleRemoveMember = (memberName) => {
    if (currentUser.role === 'owner') {
      setMembers(members.filter((member) => member !== memberName));
    }
  };

  const handleLeaveList = () => {
    if (currentUser.role === 'member') {
      alert("You've left the shopping list.");
      setMembers(members.filter((member) => member !== currentUser.name));
    }
  };

  const handleRenameList = (newName) => {
    if (currentUser.role === 'owner') {
      setListName(newName);
    }
  };

  const filteredItems = items.filter(
    (item) => filter === 'all' || (filter === 'unresolved' && !item.resolved)
  );

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar
          lists={[listName]}
          selectedList={listName}
          setSelectedList={setListName}
          currentUser={currentUser}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          onRenameList={handleRenameList}
        />
        <div className="main-content">
          <h2>{listName} Items</h2>
          <ShoppingList
            items={filteredItems}
            onToggle={handleToggleItem}
            onDelete={handleDeleteItem}
            currentUser={currentUser}
          />

          {/* Фильтры для показа всех элементов или только нерешенных */}
          <div>
            <button onClick={() => setFilter('all')}>Show All</button>
            <button onClick={() => setFilter('unresolved')}>Show Unresolved</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default App;
