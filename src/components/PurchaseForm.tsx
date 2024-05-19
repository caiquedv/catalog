import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

type PurchaseFormProps = {
  productName: string;
  productPrice: number;
  productLink: string;
};

const PurchaseForm: React.FC<PurchaseFormProps> = ({ productName, productPrice, productLink }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá, meu nome é ${name} e gostaria de comprar o produto ${productName} no valor de R$ ${productPrice.toFixed(
      2
    )}\nLink: ${productLink}`;
    const whatsappUrl = `https://wa.me/5511985208044?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const displayMessage = `Olá, meu nome é ${name || '_____'} e gostaria de comprar o produto ${productName} no valor de R$ ${productPrice.toFixed(2)}.`;

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
          value={displayMessage}
          readOnly
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Enviar pelo WhatsApp
      </Button>
    </Form>
  );
};

export default PurchaseForm;
