import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const checkemail = () => {
    if (email.trim() === '') {
      setError('El campo de correo electrónico no puede estar vacío.');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    setError('');
    return true;
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Intentando login con:', { email, password });
      
      const response = await fetch('http://localhost:4002/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('Status de respuesta:', response.status);
      const data = await response.json();
      console.log('Datos de respuesta del servidor:', data);

      if (!response.ok) {
        setError(data.message || data.error || 'Error en el login');
        return;
      }

      // El servidor puede devolver el token como: token, jwtToken, accessToken/access_token o como string
      let jwtToken = null;
      if (data) {
        if (typeof data === 'string') jwtToken = data;
        else if (typeof data === 'object') {
          jwtToken = data.token || data.jwtToken || data.accessToken || data.access_token || null;
        }
      }

      console.log('Token extraído:', jwtToken);

      // Guardar el token en el contexto (solo si es string válido)
      if (jwtToken && typeof jwtToken === 'string') {
        login(jwtToken);
        console.log('Token guardado, redirigiendo...');
        // Redirigir a home
        navigate('/home');
      } else {
        setError('No se recibió token del servidor');
        console.error('No hay token en la respuesta:', data);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="left-panel w-1/2 flex ">
        <div className="bg-black/60 w-full h-full flex items-center">
          <div className="w-full flex flex-col justify-center px-16">
            <p className="text-6xl font-black italic uppercase text-lime-400 leading-none">
              SUPLEMENTOS <br /> PUNCHIS
            </p>

            <p className="text-left text-white text-3xl font-bold mt-6">
              TRANSFORMÁ <br /> TU CUERPO
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-black flex flex-col justify-center px-20">
        <h1 className='text-white text-5x1 font-black uppercase'>Sign in</h1>
        <div className='mt-10'>
          <input
            type="text"
            placeholder='Username'
            value={email}
            onChange={(evento) => {
              const value = evento.target.value;
              setEmail(value);
            }}
            className='w-full p-4 rounded-lg bg-gray-800 text-white mb-4'
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(evento) => {
              setPassword(evento.target.value);
            }}
            className='w-full p-4 rounded-lg bg-gray-800 text-white mb-6'
          />
          <button
            onClick={() => {
              if (checkemail()) {
                handleLogin();
              }
            }}
            disabled={loading}
            className='w-full p-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-500 transition-colors disabled:opacity-50'
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <Link to="/register" className='text-center text-gray-300 mt-6 hover:text-lime-400 cursor-pointer transition-colors'>Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;