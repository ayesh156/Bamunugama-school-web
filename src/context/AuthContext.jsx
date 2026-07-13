import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = useCallback((username, password) => {
    if (
      username === MOCK_CREDENTIALS.username &&
      password === MOCK_CREDENTIALS.password
    ) {
      setUser({ username, role: 'admin' });
      setError('');
      return true;
    }
    setError('Invalid username or password. Please try again.');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError('');
  }, []);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}