import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Container } from 'reactstrap'
import ProductsList from '../components/ProductsList'
import productsData from '../../database.json'

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const products: ProductType[] = productsData;
  return { props: { products } }
}

const Products: NextPage = (props: {
  children?: ReactNode
  products?: ProductType[]
}) => {
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

          {<ProductsList products={props.products!} />}
        </Container>
      </main>
    </>
  )
}

export default Products
