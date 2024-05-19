import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { ProductType } from '../services/products';

type ProductCardProps = {
  product: ProductType;
  currentPage: number;
  selectedCategory: string | null;
  isLoggedIn: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, currentPage, selectedCategory, isLoggedIn }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/productForm?id=${product.id}`);
  };

  return (
    <Card className="h-100">
      <Link legacyBehavior href={`/product/${product.id}?page=${currentPage}&category=${selectedCategory !== null ? selectedCategory : ''}`} passHref>
        <a className="text-decoration-none text-dark">
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
