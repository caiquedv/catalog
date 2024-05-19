// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { db } from '../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query(collection(db, 'edit_users'), where('username', '==', user), where('password', '==', password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="user">Usuário</Label>
          <Input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" color="primary">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
