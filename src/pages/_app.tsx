import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
