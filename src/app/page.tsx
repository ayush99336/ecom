'use client';

import { useState } from 'react';
import initialProducts from '../../components/products';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);

  const handleBuy = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handlePay = () => {
    const purchasedIds = cart.map((item) => item.id);
    const updatedProducts = products.filter(
      (product) => !purchasedIds.includes(product.id)
    );
    setProducts(updatedProducts);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div>
      <h1>Picture Store</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {products.map((product) => (
          <Card key={product.id} style={{ width: 220 }}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
              <p style={{ margin: '8px 0' }}>${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleBuy(product)} style={{ width: '100%' }}>
                Buy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: 32, maxWidth: 400 }}>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <>
              <ul style={{ marginBottom: 12 }}>
                {cart.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              <p>Total: ${total}</p>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handlePay} disabled={cart.length === 0} style={{ width: '100%' }}>
            Pay
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
