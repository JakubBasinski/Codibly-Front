import React, { useState, useCallback } from 'react';

interface AuthContextType {
  angle: number;
  changeAngle: () => void;
  token: string | null | undefined;
  userId: string | null | undefined;
  isLoggedIn: boolean;
  login: (token: string, user: string) => void;
  logout: () => void;
  pickedUpProducts: { name: string; color: string; id: number }[] | undefined;
  setProducts: (products: []) => void;
}

const AuthorizationContext = React.createContext<AuthContextType>({
  token: '',
  userId: '',
  angle: 0,
  changeAngle: () => {},
  isLoggedIn: false,
  login: (token: string, user: string) => {},
  logout: () => {},
  pickedUpProducts: [],
  setProducts: ([]) => {},
});

const retriveStored = () => {
  const storedToken = localStorage.getItem('token');
  const storedId = localStorage.getItem('userId');
  return {
    token: storedToken,
    userId: storedId,
  };
};

type Props = {
  children: React.ReactNode;
};

export const AuthorizationContextProvider = ({ children }: Props) => {
  const [angle, setAngle] = useState(0);
  const setAngleHandler = () => {
    setAngle((p) => p + 180);
  };

  const [pickedUpProducts, setPickedProducts] = useState<
    { name: string; color: string; id: number }[] | undefined
  >([]);
  const setPickedProductsHangler = (products: []) => {
    setPickedProducts(products);
  };

  const storagedData = retriveStored();
  let tokenData;
  let initialToken;
  let initialUserId;

  if (storagedData) {
    tokenData = storagedData.token;
    initialUserId = storagedData.userId;
  }

  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState<string | undefined | null>(initialToken);
  const [userId, setUserId] = useState<string | undefined | null>(
    initialUserId
  );
  const initialUserIsLoggedIn = !!token;
  const [isLoggedIn, setUserIsLogin] = useState(initialUserIsLoggedIn);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserIsLogin(false);
    setAngleHandler();
  }, []);

  const loginHandler = (token: string, userId: string) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setUserIsLogin(true);
    setAngleHandler();
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId,
    angle: angle,
    changeAngle: setAngleHandler,
    pickedUpProducts: pickedUpProducts,
    setProducts: setPickedProductsHangler,
  };

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationContext;
