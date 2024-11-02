import React from 'react';
import styles from '../styles/Sidebar.module.css'

function Sidebar({ lists, selectedList, setSelectedList }) {
  return (
    <div className={styles.sidebar}>
      <ul>
        {lists.map((list, index) => (
          <li key={index} className={styles.listItem}>
            <button
              onClick={() => setSelectedList(list)}
              className={`${styles.listButton} ${selectedList === list ? styles.selected : ''}`}
            >
              {list}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.addListButton}>add list</button>
      <button className={styles.newMemberButton}>new member</button>
    </div>
  );
}

export default Sidebar;
