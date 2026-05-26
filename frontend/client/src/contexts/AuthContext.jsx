import { createContext, useState, useEffect } from 'react';

const isJwtLike = (value) => typeof value === 'string' && value.split('.').length === 3;

// Normaliza el token recibido: extrae strings válidos y descarta objetos o basura.
const normalizeToken = (value) => {
  if (!value) return null;

  if (typeof value === 'string') {
    const cleaned = value.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '').replace(/\s+/g, '');
    return isJwtLike(cleaned) ? cleaned : null;
  }

  if (typeof value === 'object') {
    const candidate = value.token || value.jwtToken || value.accessToken || null;
    return normalizeToken(candidate);
  }

  return null;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar token del localStorage al montar
  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) {
      const normalized = normalizeToken(savedToken);
      if (normalized) {
        setToken(normalized);
      } else {
        localStorage.removeItem('jwtToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (jwtToken) => {
    const normalized = normalizeToken(jwtToken);
    if (!normalized) {
      console.error('Login recibió un token inválido:', jwtToken);
      logout();
      return;
    }

    setToken(normalized);
    localStorage.setItem('jwtToken', normalized);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
