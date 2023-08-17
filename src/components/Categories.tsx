import { memo } from 'react';

const categories = ['Все', 'Мясные', 'Гриль', 'Острое', 'Вегетарианское', 'Закрытые'];

type CategoriesType = {
  value: number;
  onChangeCategory: (idx: number) => void
}

const Categories: React.FC<CategoriesType> = memo(({value, onChangeCategory}) => {
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => {
            return (
              <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>{categoryName}</li>
            )
          })
        }
      </ul>
    </div>
  )
});

export default Categories;
