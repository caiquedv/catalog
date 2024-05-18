import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Container } from 'reactstrap';
import ProductsList from '../components/ProductsList';
import productsData from '../../database.json';

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const products: ProductType[] = productsData;
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

      <main>
        <Container className="mb-5">
          <h1 className="my-5">
            Nossos Produtos
          </h1>

          {<ProductsList products={props.products!} currentPage={currentPage} initialCategory={initialCategory} />}
        </Container>
      </main>
    </>
  );
}

export default Products;
