'use client';

import { useState } from 'react';

// Define a Product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Static product data (normally import this from another file)
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Sunset',
    price: 25,
    image: '/sunset.png',
  },
  {
    id: '2',
    name: 'Mountains',
    price: 40,
    image: '/mountains.png',
  },
  {
    id: '3',
    name: 'Beach',
    price: 30,
    image: '/beach.png',
  },
  {
    id: '4',
    name: 'Cityscape',
    price: 35,
    image: '/cityscape.png',
  },
];

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Picture Store</h1>

      {/* Product Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-3"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => handleBuy(product)}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          <div>
            <ul className="mb-4">
              {cart.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <p className="font-semibold mb-2">Total: ${total}</p>
            <button
              onClick={handlePay}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
