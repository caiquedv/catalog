import React from 'react';
import { Container } from 'reactstrap';
import ProductForm from '../components/ProductForm';

const ProductFormPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4">Cadastro/Edição de Produto</h1>
      <ProductForm />
    </Container>
  );
};

export default ProductFormPage;
