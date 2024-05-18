import React from "react";
import PurchaseForm from "../components/PurchaseForm";
import { Container } from "reactstrap";

const PurchasePage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1>Formulário de Compra</h1>
      <PurchaseForm />
    </Container>
  );
};

export default PurchasePage;
