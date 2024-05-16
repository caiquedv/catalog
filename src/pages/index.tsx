import { NextPage } from 'next'
import Head from 'next/head'
import { Container } from 'reactstrap'
import Header from '../components/Header'
import ProductsList from '../components/ProductsList'
import { ProductType } from '../services/products'

const Products: NextPage<{ products?: ProductType[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Nossos Produtos</title>
        <meta name="description" content="Conheça todos os nossos produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container className="mb-5">
          <h1 className="my-5">
            Nossos Produtos
          </h1>

          {props.products && props.products.length > 0 && (
            <ProductsList products={props.products} />
          )}
        </Container>
      </main>
    </>
  )
}

export default Products
