import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Category } from '../interfaces/category';
interface CategoryFormProps {
  onFinish?: (values: Category) => void;
  initialValues?: Category;
  isEdit?: boolean;
  isView?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onFinish,
  initialValues,
  isEdit = false,
  isView = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) return;
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form
      requiredMark={false}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      disabled={isView}
    >
      <Form.Item<Category>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input />
      </Form.Item>

      {isView ? (
        ''
      ) : (
        <Form.Item label={null} className="!mb-0">
          <Button type="primary" htmlType="submit" className="w-full">
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default CategoryForm;
