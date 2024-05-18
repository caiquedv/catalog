import Link from 'next/link';
import { Card, CardBody, CardSubtitle, Button } from 'reactstrap';
import { ProductType } from '../services/products';

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <Card>
        <CardBody>
          <h5 className="card-title">{product.name}</h5>
          <img src={product.imageUrl} alt={product.name} className="card-img-top" />
          <CardSubtitle className="mb-3 text-muted">R$ {product.price}</CardSubtitle>
          <Button color="dark" className="pb-2" block>
            Ver Detalhes
          </Button>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
