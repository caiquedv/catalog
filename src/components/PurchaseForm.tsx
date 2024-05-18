import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

type PurchaseFormProps = {
  productName: string;
  productPrice: number;
  productLink: string;
};

const PurchaseForm: React.FC<PurchaseFormProps> = ({ productName, productPrice, productLink }) => {
  const [name, setName] = useState('');
  const [observations, setObservations] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá, gostaria de comprar o produto ${productName} por R$ ${productPrice.toFixed(
      2
    )} que ví no link: ${productLink}\n\nNome: ${name}\nObservações: ${observations}`;
    const whatsappUrl = `https://wa.me/5511985208044?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Nome</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Mensagem</Label>
        <Input
          type="textarea"
          disabled
          value={`Olá, gostaria de comprar o produto ${productName} por R$ ${productPrice.toFixed(2)} que ví no link: ${productLink}`}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          name="observations"
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Escreva sua dúvida ou observação..."
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Enviar
      </Button>
    </Form>
  );
};

export default PurchaseForm;
