import React from 'react';
import { Link } from 'react-router-dom';

export const CartEmpty = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <Link to="/" className="button button--black" style={{marginTop: '30px'}}>
      <span>Вернуться назад</span>
    </Link>
  </div>
);