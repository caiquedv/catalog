import { useRouter } from 'next/router';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import { ProductType } from '../services/products';

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleBuyButtonClick = () => {
    router.push({
      pathname: '/purchase',
      query: {
        productName: product.name,
        productPrice: product.price.toString(),
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <h5 className="card-title">{product.name}</h5>
        <img src={product.imageUrl} alt={product.name} className="card-img-top" />
        <CardSubtitle className="mb-3 text-muted">R$ {product.price}</CardSubtitle>
        <Button color="dark" className="pb-2" block onClick={handleBuyButtonClick}>
          Comprar
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
