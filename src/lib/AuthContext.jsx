import React, { createContext, useContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: true,
  user: null,
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true, user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
