export const Categories = (props) => {
  const { value, onClickCategory } = props;
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => (
          <li
            className={value === index ? 'active' : ''}
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
