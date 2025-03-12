import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryForm } from '../../../components';
import { Category } from '../../../interfaces/category';
import { useEntity } from '../../../hooks';

const EditCategory: React.FC = () => {
  const { categoryId } = useParams();
  const { getEntityById, editEntity } = useEntity('categorie');
  const [category, setCategory] = useState<Category>();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryById = async (categoryId: number) => {
      const category: any = await getEntityById(categoryId);
      setCategory(category);
    };

    getCategoryById(Number(categoryId));
  }, []);

  const handleEditCategory = async (values: Category) => {
    await editEntity(Number(categoryId), values);
    // navigate('/admin/users');
  };

  return (
    <CategoryForm
      isEdit
      initialValues={category}
      onFinish={handleEditCategory}
    />
  );
};

export default EditCategory;
