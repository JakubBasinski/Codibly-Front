import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthorizationContext from '../store/authorization.context';

export const useDropProduct = () => {
  const { setProducts } = useContext(AuthorizationContext);
  const [state, setState] = useState<
    SetStateAction<{
      isLoading: boolean;
      error: {} | undefined;
      serverMsg: string;
    }>
  >({
    isLoading: false,
    error: {},
    serverMsg: '',
  });

  const fn = async (data: { name: string; id: number; color: string }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    await axios
      .post(`${url}/drop`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setState({
            isLoading: false,
            error: {},
            serverMsg: res.data.message,
          });
        }
        if (res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { dropProduct: fn, ...state };
};
