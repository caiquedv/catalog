import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'reactstrap';
import { db } from '../services/firebaseConfig'; // Importe a instância do Firestore
import PurchaseForm from '../components/PurchaseForm';
import { doc, getDoc } from 'firebase/firestore';
import { ProductType } from '../types';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductType | null>(null); // Estado para armazenar os detalhes do produto
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === 'string') {
          const docRef = await getDoc(doc(db, 'products', id)); // Obtém o documento do produto com o ID correspondente
          if (docRef.exists()) {
            setProduct({
              id: docRef.id,
              ...docRef.data()
            } as ProductType);
          } else {
            console.log('Produto não encontrado');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar produto do Firebase:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Carregando...</div>; // Renderiza enquanto o produto está sendo carregado
  }

  const productLink = `${window.location.origin}/product/${product.id}`;

  return (
    <Container className="mt-5">
      <Row className='pt-md-5 pt-lg-5'>
        <Col md={6}>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
        </Col>
        <Col md={6}>
          <p>{product.description}</p>
          <h3>R$ {product.price.toFixed(2)}</h3>
          <Button color="dark" onClick={() => setShowForm(true)} disabled={showForm}>
            Realizar pedido
          </Button>
          <br /><br />
          {showForm && <PurchaseForm productName={product.name} productPrice={product.price} productLink={productLink} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
