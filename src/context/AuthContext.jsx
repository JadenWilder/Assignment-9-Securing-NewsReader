
import { createContext, useContext, useState } from 'react';

/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('newsreaderUser');

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem('newsreaderUser');
      return null;
    }
  });

  const login = (username, password, role) => {
    if (!username.trim() || !password.trim()) {
      throw new Error('Username and password are required.');
    }

    if (!['regular', 'admin'].includes(role)) {
      throw new Error('Invalid user role.');
    }

    const loggedInUser = {
      username: username.trim(),
      role
    };

    localStorage.setItem(
      'newsreaderUser',
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('newsreaderUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
