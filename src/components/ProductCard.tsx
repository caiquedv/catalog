import { useRouter } from 'next/router';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import { ProductType } from '../services/products';

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Initializing the router
  const router = useRouter();

  // Function to handle the buy button click event
  const handleBuyButtonClick = () => {
    // Navigating to the purchase page with query parameters
    router.push({
      pathname: '/purchase',
      query: {
        productName: product.name,
        productPrice: product.price.toString(),
      },
    });
  };

  // Rendering the product card component
  return (
    <Card>
      {/* Rendering card content */}
      <CardBody>
        {/* Rendering product name */}
        <h5 className="card-title">{product.name}</h5>
        {/* Rendering product image */}
        <img src={product.imageUrl} alt={product.name} className="card-img-top" />
        {/* Rendering product price */}
        <CardSubtitle className="mb-3 text-muted">R$ {product.price}</CardSubtitle>
        {/* Rendering buy button */}
        <Button color="dark" className="pb-2" block onClick={handleBuyButtonClick}>
          Comprar
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
