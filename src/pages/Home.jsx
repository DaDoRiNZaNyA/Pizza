import React, { useEffect, useState } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

export const Home = (props) => {
  const {searchValue} = props; 
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности ↓',
    sort: 'rating',
    order: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);

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
      link = `https://64a41085c3b509573b56feb2.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}?category=${categoryId}&sortBy=${sortType.sort}&order=${sortType.order}`;
    }    
    fetch(link)
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId, sortType, searchValue, currentPage]);
  

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
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
