import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Pagination, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ProductList } from '../components';

const filterItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Price: Low to High',
  },
  {
    key: '2',
    label: 'Price: High to Low',
  },
];

const Category: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case '/categories/tops':
        document.title = 'Tops | Jelo';
        setTitle('Tops');
        break;
      case '/categories/bottoms':
        document.title = 'Bottoms | Jelo';
        setTitle('Bottoms');
        break;
      case '/categories/sweaters':
        document.title = 'Sweaters | Jelo';
        setTitle('Sweaters');
        break;
      case '/categories/hoodies':
        document.title = 'Hoodies | Jelo';
        setTitle('Hoodies');
        break;
      case '/categories/outerwear':
        document.title = 'Outerwear | Jelo';
        setTitle('Outerwear');
        break;
      case '/categories/accessories':
        document.title = 'Accessories | Jelo';
        setTitle('Accessories');
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl !mb-4 uppercase">{title}</h2>
        <Dropdown menu={{ items: filterItems }}>
          <Button>Filter</Button>
        </Dropdown>
      </div>
      <ProductList />
      <div className="flex !mt-4 justify-center">
        <Pagination defaultCurrent={1} total={30} />
      </div>
    </>
  );
};

export default Category;
