import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../../../components';
import { Category } from '../../../interfaces/category';
import { useEntity } from '../../../hooks';

const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const { createEntity } = useEntity('categorie');

  const handleCreateCategory = async (values: Category) => {
    await createEntity(values);
    navigate('/admin/categories');
  };

  return <CategoryForm onFinish={handleCreateCategory} />;
};

export default CreateCategory;
