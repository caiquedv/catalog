export type ProductType = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
}

export const fetchProducts = async () => {
  const apiUrl = 'https://caiquedv.github.io/catalog/api/products';
  const products: ProductType[] = await fetch(apiUrl).then(res => res.json());
  return products;
}

export const fetchProduct = async (id: string | number) => {
  const apiUrl = `https://caiquedv.github.io/catalog/api/products/${id}`;
  const product: ProductType = await fetch(apiUrl).then(res => res.json());
  return product;
}
