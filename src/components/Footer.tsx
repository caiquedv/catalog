import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-3">
      <Container>
        <Row>
          <Col md="9">
            <h5>Sobre Nós</h5>
            <p>
              Somos uma empresa dedicada a fornecer os melhores produtos e serviços para nossos clientes.
            </p>
          </Col>
          <Col md="3">
            <h5>Contato</h5>
            <p>
              Telefone: (66) 9 1234-5678<br />
              Campo Verde - Mato Grosso.
            </p>
          </Col>
        </Row>
        <hr className="mt-0"/>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Avance Importados. Todos os direitos reservados.</p>
            <p>
            Desenvolvido por <a className="text-decoration-none " href="https://www.linkedin.com/in/caique-arruda/" target="_blank" rel="noopener noreferrer">Caique Arruda 🍀</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
