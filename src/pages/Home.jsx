import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.filter.pageCount);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [pizzas, setPizzas] = useState([]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      setPizzas([]);
      let link = "";
      let search = "";
      if (searchValue !== "") {
        search = `&search=${searchValue}`;
      } else {
        search = "";
      }
      if (categoryId == 0) {
        link = `https://64a41085c3b509573b56feb2.mockapi.io/pizzas?page=${pageCount}&limit=4${search}&sortBy=${sort.sort}&order=${sort.order}`;
      } else {
        link = `https://64a41085c3b509573b56feb2.mockapi.io/pizzas?category=${categoryId}&page=${pageCount}&limit=4${search}&sortBy=${sort.sort}&order=${sort.order}`;
      }
      axios
        .get(link)
        .then((res) => {
          setPizzas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, pageCount]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, pageCount]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.length === 0
          ? [...Array(10)].map((i, index) => <Skeleton key={index} />)
          : pizzas.map((item) => (
              <PizzaBlock
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                types={item.types}
                sizes={item.sizes}
                price={item.price}
                category={item.category}
                rating={item.rating}
              />
            ))}
      </div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </>
  );
};
