// pages/login.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  
  useEffect(() => {
    login();
    localStorage.removeItem('productName');
    router.push('/');
  }, [login, router]);

  return null; 
};

export default LoginPage;
