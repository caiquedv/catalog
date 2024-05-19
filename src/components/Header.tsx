import Link from 'next/link';
import { Navbar, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import products from '../../database.json';

const Header = () => {
  const router = useRouter();
  const { id, page, category } = router.query;
  const isRoot = router.pathname === '/';
  const product = products.find((p) => p.id === Number(id));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleBackButtonClick = () => {
    if (!isRoot) {
      router.push(`/?page=${page || ''}&category=${category || ''}`);
    }
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
          {isRoot ? 'Avance Importados' : product ? `${product.name}` : ''}
        </span>
      </div>
      {isLoggedIn && (
        <div>
          <Link href="/productForm">
            <Button color="primary" className="me-2">Novo</Button>
          </Link>
          <Button color="danger" onClick={handleLogout}>Sair</Button>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
