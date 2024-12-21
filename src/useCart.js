import { useState } from 'react';

// export interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

export const useCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    }
  ]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
  };
};