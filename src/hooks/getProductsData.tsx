import { useQuery } from 'react-query';
import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

let url = import.meta.env.VITE_URL;

const fetchProducts = ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const page = queryKey[1];
  return axios.get(`${url}?page=${page}`);
};

export const useProductsData = (page: string | null | undefined) => {
  return useQuery(['products', page], fetchProducts);
};
