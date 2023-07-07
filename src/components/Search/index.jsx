import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss'

export const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.filter.searchValue)

  return (
    <input onChange={(event) => dispatch(setSearchValue(event.target.value))} value={searchValue} className={styles.root} placeholder='Поиск...'></input>
  )
}
