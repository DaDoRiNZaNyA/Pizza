import React, { useEffect, useState } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('https://64a41085c3b509573b56feb2.mockapi.io/pizzas')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {pizzas.length === 0
          ? [...Array(10)].map(() => <Skeleton />)
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
    </>
  );
};
