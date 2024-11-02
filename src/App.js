import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ShoppingList from './components/shopinglist';
import Footer from './components/footer';
import './styles/app.css';

function App() {
  const [selectedList, setSelectedList] = React.useState("Tesco");
  const lists = {
    Tesco: [
      { name: 'Item 1', bought: false },
      { name: 'Item 2', bought: false },
      { name: 'Item 3', bought: false },
      { name: 'Item 4', bought: false },
      { name: 'Item 5', bought: false },
    ],
    DM: [
      { name: 'Item A', bought: false },
      { name: 'Item B', bought: false },
    ],
  };

  const handleToggleItem = (index) => {
    const newList = [...lists[selectedList]];
    newList[index].bought = !newList[index].bought;
    lists[selectedList] = newList;
    setSelectedList(selectedList);
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Sidebar lists={Object.keys(lists)} selectedList={selectedList} setSelectedList={setSelectedList} />
        <ShoppingList items={lists[selectedList]} onToggle={handleToggleItem} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
