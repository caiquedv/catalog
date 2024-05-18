import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'reactstrap';
import { ProductType } from '../pages/index';
import products from '../../database.json';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id, page, category } = router.query;

  const product: ProductType | undefined = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <Container className="mt-5">
      <Button color="secondary" onClick={() => router.push(`/?page=${page}&category=${category || ''}`)} className="mb-3">Voltar</Button>
      <Row>
        <Col md={6}>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>R$ {product.price.toFixed(2)}</h3>
          <Button color="dark" onClick={() => router.push(`/purchase?productName=${product.name}&productPrice=${product.price}`)}>
            Comprar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
