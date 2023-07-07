import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

export const Home = (props) => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort);
  const searchValue = useSelector(state => state.filter.searchValue);
  const [pizzas, setPizzas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const onChangeCategory = (id) => {
     dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setPizzas([]);
    let link = '';
    let search = '';
    if (searchValue !== '&') {
      search = `&search=${searchValue}&`;
    } else {
      search = '';
    }
    if (categoryId === 0) {
      link = `https://64a41085c3b509573b56feb2.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}sortBy=${sortType.sort}&order=${sortType.order}`;
    } else {
      link = `https://64a41085c3b509573b56feb2.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}category=${categoryId}&sortBy=${sortType.sort}&order=${sortType.order}`;
    }    
    fetch(link)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPizzas(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId,sortType, searchValue, currentPage]);
  

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
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
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </>
  );
};
