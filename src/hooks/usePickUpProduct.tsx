import { SetStateAction, useState } from 'react';
import axios from 'axios';

export const useCreateUser = () => {
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

  let url = import.meta.env.VITE_BACKEND_URL;

  const fn = async (data: {}) => {
    setState(
      (prevState: {
        isLoading: boolean;
        error: {} | undefined;
        serverMsg: string;
      }) => ({
        ...prevState,
        isLoading: true,
      })
    );
    await axios
      .post(`${url}/pickup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setState(
          (pre: {
            isLoading: boolean;
            error: {} | undefined;
            serverMsg: string;
          }) => ({
            ...pre,
            serverMsg: res.data.message,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { postCreateUser: fn, ...state };
};
