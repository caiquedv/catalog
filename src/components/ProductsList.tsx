import React, { useState, useEffect } from 'react';
import { Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Input, Button } from 'reactstrap';
import { ProductType } from '../pages/index';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: ProductType[];
  currentPage: number;
  initialCategory: string | null;
};

const ProductsList: React.FC<ProductListProps> = ({ products, currentPage: initialPage, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Row>
        <Col md={6} lg={8} xl={6}>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="mb-3">
            <DropdownToggle caret>
              {selectedCategory ? `${selectedCategory}` : 'Todas os produtos'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleCategoryChange(null)}>Todas os produtos</DropdownItem>
              {categories.map(category => (
                <DropdownItem key={category} onClick={() => handleCategoryChange(category)}>
                  {category}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>

        <Col md={6} lg={8} xl={6} className="mb-3">
          <Input
            type="text"
            placeholder="Buscar produto por nome"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-3"
            style={{ width: 'auto' }}
          />
        </Col>
      </Row>

      <Row className="g-5">
        {paginatedProducts.map(product => (
          <Col md={6} lg={4} xl={3} key={product.id}>
            <ProductCard product={product} currentPage={currentPage} selectedCategory={selectedCategory} isLoggedIn={isLoggedIn} />
          </Col>
        ))}
      </Row>

      <Pagination className="mt-5 d-flex justify-content-center">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink first onClick={() => handlePageChange(1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem active={currentPage === index + 1} key={index}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink last onClick={() => handlePageChange(totalPages)} />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default ProductsList;
