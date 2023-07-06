import React from 'react';

import styles from './Search.module.scss'

export const Search = (props) => {
  const {searchValue, setSearchValue} = props;
  return (
    <input onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={styles.root} placeholder='Поиск...'></input>
  )
}
