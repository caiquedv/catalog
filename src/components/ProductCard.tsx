// components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { ProductType } from '../types';
import { useAuth } from '../contexts/AuthContext';

type ProductCardProps = {
  product: ProductType;
  currentPage: number;
  selectedCategory: string | null;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, currentPage, selectedCategory }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleEditClick = () => {
    router.push(`/productForm?id=${product.id}&page=${currentPage}&category=${selectedCategory || ''}`);
  };

  const handleViewDetailsClick = () => {
    localStorage.setItem('productName', product.name);
  };

  return (
    <Card className="h-100">
      <Link legacyBehavior href={`/product/${product.id}?page=${currentPage}&category=${selectedCategory !== null ? selectedCategory : ''}`} passHref>
        <a className="text-decoration-none text-dark" onClick={handleViewDetailsClick}>
          <CardImg top width="100%" src={product.imageUrl} alt={product.name} />
          <CardBody>
            <CardTitle tag="h5">{product.name}</CardTitle>
            <CardSubtitle className="mb-3 text-muted">R$ {product.price}</CardSubtitle>
            <Button color="dark" block>
              Ver Detalhes
            </Button>
          </CardBody>
        </a>
      </Link>
      {isLoggedIn && (
        <Button color="primary" onClick={handleEditClick} className="m-2">
          Editar
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
