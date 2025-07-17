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


const zoomImgStyle = `
  .zoom-img-wrapper:hover .zoom-img {
    transform: scale(1.15);
  }
`;

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);

  const handleBuy = (product: Product) => setCart((prev) => [...prev, product]);

  const handlePay = () => {
    const purchasedIds = cart.map((item) => item.id);
    setProducts(products.filter((product) => !purchasedIds.includes(product.id)));
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Picture Store</h1>
        <div className="flex flex-wrap gap-8 items-start justify-center">
          {/* Product Grid */}
          <div className="flex-2 min-w-[320px] w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="w-full max-w-xs mx-auto">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="zoom-img-wrapper overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="zoom-img w-full min-h-[120px] max-h-[140px] object-cover rounded-lg transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-2 font-medium">${product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleBuy(product)} className="w-full">
                      Buy
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center mt-10 text-muted-foreground">
                <p>No products left. Come back soon!</p>
              </div>
            )}
          </div>
          {/* Cart */}
          <div className="flex-1 min-w-[320px] w-full md:w-1/3">
            <Card className="max-w-sm mx-auto mt-0">
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p>Cart is empty.</p>
                ) : (
                  <>
                    <ul className="mb-3">
                      {cart.map((item, idx) => (
                        <li key={idx}>
                          {item.name} - ${item.price}
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold">Total: ${total}</p>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handlePay} disabled={cart.length === 0} className="w-full">
                  Pay
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <style>{zoomImgStyle}</style>
    </div>
  );
}
