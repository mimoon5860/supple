import React, { createContext } from "react";
import useFirebase from "../../pages/hooks/useFirebase";
import { useEffect } from "react";
import { useState } from "react";
import useCart from "../../pages/hooks/useCart";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContexts = useFirebase();
  const [cart, setCart] = useState([]);
  const { getCartItem } = useCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const cartItems = getCartItem();
    setCart(cartItems);
  }, []);

  return (
    <AuthContext.Provider value={{ ...allContexts, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
