const isJwtLike = (value) => typeof value === 'string' && value.split('.').length === 3;

const extractToken = (value) => {
  if (!value) return null;
  if (typeof value === 'string') {
    const cleaned = value.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '').replace(/\s+/g, '');
    return isJwtLike(cleaned) ? cleaned : null;
  }
  if (typeof value === 'object') {
    return extractToken(value.token || value.jwtToken || value.accessToken || null);
  }
  return null;
};

// Función para hacer fetch con el JWT automáticamente
export const fetchWithAuth = async (url, options = {}, getToken, navigate) => {
  const token = extractToken(getToken());

  // Si no hay token válido, no hacer la petición
  if (!token) {
    console.warn('[fetchWithAuth] No hay token válido disponible');
    throw new Error('No hay autenticación. Por favor inicia sesión.');
  }

  const cleanToken = token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  headers['Authorization'] = `Bearer ${cleanToken}`;

  try {
    console.log(`[fetchWithAuth] ${options.method || 'GET'} ${url}`);
    console.log(`[fetchWithAuth] Token length: ${String(cleanToken).length}`);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    console.log(`[fetchWithAuth] Status: ${response.status}`);

    // Si el token expiró (401)
    if (response.status === 401) {
      console.error('Token expirado (401)');
      // Limpiar token
      localStorage.removeItem('jwtToken');
      // Redirigir a login
      navigate('/login');
      throw new Error('Token expirado. Por favor, inicia sesión de nuevo.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error HTTP ${response.status}:`, errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('[fetchWithAuth] Error:', error);
    throw error;
  }
};
