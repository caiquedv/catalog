// components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ProductForm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const product = docSnap.data();
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setImageUrl(product.imageUrl);
          setCategory(product.category);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      category,
    };

    if (id) {
      // Update existing product
      const docRef = doc(db, 'products', id as string);
      await updateDoc(docRef, productData);
    } else {
      // Add new product
      await addDoc(collection(db, 'products'), productData);
    }
    router.push('/');
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
        <Label for="description">Descrição</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Preço</Label>
        <Input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="imageUrl">URL da Imagem</Label>
        <Input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="category">Categoria</Label>
        <Input
          type="text"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">
        {id ? 'Atualizar Produto' : 'Adicionar Produto'}
      </Button>
    </Form>
  );
};

export default ProductForm;
