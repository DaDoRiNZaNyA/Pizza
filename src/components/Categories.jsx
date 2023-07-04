import { useState } from 'react';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (number) => {
    setActiveIndex(number);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => (
          <li
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
