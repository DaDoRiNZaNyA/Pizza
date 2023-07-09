import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

export const Search = () => {
  const { localSearchValue, setLocalSearchValue } = useState("");
  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    debounce((event) => {
      dispatch(setSearchValue(event.target.value));
    }, 1000),
    []
  );
  return (
    <input
      onChange={onChangeInput}
      value={localSearchValue}
      className={styles.root}
      placeholder="Поиск..."
    ></input>
  );
};
