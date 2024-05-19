import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

type ProductType = {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
};

const ProductForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductType>({ name: '', description: '', imageUrl: '', category: '' });
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEdit) {
        try {
          const docRef = doc(db, 'products', String(id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const productData = docSnap.data() as ProductType;
            setProduct(productData);
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      } else {
        // Reset form when not editing
        setProduct({ name: '', description: '', imageUrl: '', category: '' });
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const docRef = doc(db, 'products', String(id));
        await updateDoc(docRef, product);
      } else {
        const newProduct = { ...product };
        await addDoc(collection(db, 'products'), newProduct);
      }
      router.push('/');
    } catch (error) {
      console.error('Error adding/updating document:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>{isEdit ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Nome</Label>
          <Input type="text" name="name" id="name" value={product.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="description">Descrição</Label>
          <Input type="textarea" name="description" id="description" value={product.description} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="imageUrl">URL da Imagem</Label>
          <Input type="url" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="category">Categoria</Label>
          <Input type="text" name="category" id="category" value={product.category} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" color="primary">{isEdit ? 'Atualizar' : 'Cadastrar'}</Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
