import React from 'react';
import axios from 'axios';

export function usePickupProduct(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setServerMsg: React.Dispatch<React.SetStateAction<string>>,
  setProducts: (products: []) => void
) {
  return async (data: { name: string; id: number; color: string }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    await axios
      .post(`${url}/pickup`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setOpen(true);
          setServerMsg(res.data.message);
        }
        if (res.data.products) {
          setProducts(res.data.products);
          localStorage.setItem('products', res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
