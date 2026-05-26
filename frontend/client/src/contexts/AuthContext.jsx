import { createContext, useState, useEffect } from 'react';

const isJwtLike = (value) => typeof value === 'string' && value.split('.').length === 3;

const tokenKeys = ['token', 'jwtToken', 'accessToken'];

const cleanTokenString = (value) => value.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '').replace(/\s+/g, '');

const findTokenValue = (value, visited = new Set()) => {
  if (!value) return null;

  if (typeof value === 'string') {
    const cleaned = cleanTokenString(value);
    return isJwtLike(cleaned) ? cleaned : null;
  }

  if (typeof value !== 'object') {
    return null;
  }

  if (visited.has(value)) {
    return null;
  }

  visited.add(value);

  for (const key of tokenKeys) {
    const candidate = findTokenValue(value[key], visited);
    if (candidate) {
      return candidate;
    }
  }

  for (const nestedValue of Object.values(value)) {
    const candidate = findTokenValue(nestedValue, visited);
    if (candidate) {
      return candidate;
    }
  }

  return null;
};

// Normaliza el token recibido: extrae strings válidos y descarta objetos o basura.
const normalizeToken = (value) => {
  if (!value) return null;

  if (typeof value === 'string') {
    const cleaned = cleanTokenString(value);
    return isJwtLike(cleaned) ? cleaned : null;
  }

  if (typeof value === 'object') {
    return findTokenValue(value);
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
