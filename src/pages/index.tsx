import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Container } from 'reactstrap';
import ProductsList from '../components/ProductsList';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ProductType } from '../types';

export const getServerSideProps: GetServerSideProps = async () => {
  const products: ProductType[] = [];
  
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as ProductType);
    });
  } catch (error) {
    console.error("Error fetching products from Firebase:", error);
  }

  return { props: { products } };
}

const Products: NextPage = (props: {
  children?: ReactNode;
  products?: ProductType[];
}) => {
  const router = useRouter();
  const { page, category } = router.query;
  const currentPage = page ? parseInt(page as string) : 1;
  const initialCategory = category ? (category as string) : null;

  return (
    <>
      <Head>
        <title>Nossos Produtos</title>
        <meta name="description" content="Conheça todos os nossos produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mb-5">
        <ProductsList products={props.products!} currentPage={currentPage} initialCategory={initialCategory} />
      </Container>
    </>
  );
}

export default Products;
