import { useRouter } from 'next/router';
import PurchaseForm from '../components/PurchaseForm';
import { Container } from 'reactstrap';

const PurchasePage: React.FC = () => {
  const router = useRouter();
  const { productName, productPrice } = router.query;

  return (
    <Container className="mt-5">
      <h1>Formulário de Compra</h1>
      {productName && productPrice && (
        <PurchaseForm productName={productName as string} productPrice={parseFloat(productPrice as string)} />
      )}
    </Container>
  );
};

export default PurchasePage;
