import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

type PurchaseFormProps = {
  productName: string;
  productPrice: number;
};

const PurchaseForm: React.FC<PurchaseFormProps> = ({ productName, productPrice }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá, gostaria de comprar o produto ${productName} por R$ ${productPrice.toFixed(
      2
    )}.\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`;
    const whatsappUrl = `https://wa.me/5511985208044?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container className="mt-5">
      <Button color="secondary" onClick={() => router.back()} className="mb-3">Voltar</Button>
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
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="message">Mensagem</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default PurchaseForm;
