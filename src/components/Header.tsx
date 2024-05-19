// components/Header.tsx
import Link from 'next/link';
import { Navbar, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const router = useRouter();
  const { id, page, category } = router.query;
  const isRoot = router.pathname === '/';
  const [productName, setProductName] = useState('');
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const storedProductName = localStorage.getItem('productName');
    if (storedProductName) {
      setProductName(storedProductName);
    }
  }, [router.asPath]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleBackButtonClick = () => {
    if (!isRoot) {
      let backUrl = '/';
      if (page) {
        backUrl += `?page=${page}`;
        if (category) {
          backUrl += `&category=${category}`;
        }
      } else if (category) {
        backUrl += `?category=${category}`;
      }
      router.push(backUrl);
    }
  };

  const handleNewClick = () => {
    localStorage.removeItem('productName');
    setProductName('');
  };

  return (
    <Navbar container="md" className={`${!isRoot ? 'position-fixed' : 'mb-3'} w-100`} color="dark" dark>
      <div>
        {!isRoot && (
          <Button color="light" onClick={handleBackButtonClick} className="ml-auto me-3 p-0 px-1">
            Voltar
          </Button>
        )}
        <span className="navbar-brand">
          {isRoot ? 'Avance Importados' : productName}
        </span>
      </div>
      {isLoggedIn && (
        <div>
          <Link href="/productForm">
            <Button color="primary" className="me-2" onClick={handleNewClick}>Novo</Button>
          </Link>
          {router.pathname === '/' && (
            <Button color="danger" onClick={handleLogout}>Sair</Button>
          )}
        </div>
      )}
    </Navbar>
  );
};

export default Header;
