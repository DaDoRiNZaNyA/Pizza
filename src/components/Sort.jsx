import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice';
export const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(state => state.filter.sort)
  const sortRef = useRef();

  const [isShow, setIsShow] = useState(false);
  const list = [
    { name: 'популярности ↑', sort: 'rating', order: 'asc' },
    { name: 'популярности ↓', sort: 'rating', order: 'desc' },
    { name: 'цене ↑', sort: 'price', order: 'asc' },
    { name: 'цене ↓', sort: 'price', order: 'desc' },
    { name: 'алфавиту ↑', sort: 'title', order: 'asc' },
    { name: 'алфавиту ↓', sort: 'title', order: 'desc' },
  ];

  const onClickItem = (item) => {
    dispatch(setSortType(item));
    setIsShow(!isShow);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (!sortRef.current.contains(event.target)){
          setIsShow(false);
        }
    }
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    }
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label' onClick={() => setIsShow(!isShow)}>
        {isShow ? (
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            ></path>
          </svg>
        ) : (
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ transform: 'rotate(90deg)' }}
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            ></path>
          </svg>
        )}
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {isShow ? (
        <div className='sort__popup'>
          <ul>
            {list.map((item, index) => (
              <li
                key={item.name}
                className={sort === item ? 'active' : ''}
                onClick={() => onClickItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
