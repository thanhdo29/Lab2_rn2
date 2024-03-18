import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogIn, setLogIn] = useState(false);

  const login = () => setLogIn(true);

  return (
    <AuthContext.Provider value={{ isLogIn, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);

