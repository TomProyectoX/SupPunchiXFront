import './Register.css';
import InputField from '../assets/components/react/InputField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'No se pudo iniciar sesión.');
        return;
      }

      login(data);
      navigate('/home');
    } catch (loginError) {
      setError('Ocurrió un error al iniciar sesión.');
      console.error(loginError);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#e5e2e1] h-screen w-full flex flex-col font-sans overflow-hidden selection:bg-[#CCFF00] selection:text-black">
      
      {/* Top Navigation Anchor */}
      <div className="w-full flex items-center px-6 h-16 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#CCFF00] font-headline-md text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            chevron_left
          </span> 
          Inicio
        </Link>
      </div>

      {/* Main Login Canvas */}
      <main className="flex-grow flex items-center justify-center pb-16 px-6">
        <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Branding & Energy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
            <div className="space-y-4">
              <h1 className="text-1xl md:text-6xl lg:text-[72px] text-white uppercase italic leading-[0.9] font-black tracking-tighter">
                Bienvenido<br />
                <span className="text-[#CCFF00]">Suplementos Punchi</span>
              </h1>
              <p className="font-body-lg text-[16px] leading-relaxed text-[#c4c9ac] max-w-md opacity-90">
                Accedé a tu cuenta para gestionar pedidos, explorar suplementos y seguir formando parte de la comunidad Punchis.
              </p>
            </div>

            {/* Bento Metric Highlighting Elite Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141414] border-l-4 border-[#CCFF00] p-6">
                <span className="font-label-bold text-xs text-[#CCFF00] block mb-1 uppercase tracking-widest font-bold">ENERGIA</span>
                <div className="text-3xl font-extrabold text-white tracking-tight">100%</div>
              </div>
              <div className="bg-[#141414] border-l-4 border-[#CCFF00] p-6">
                <span className="font-label-bold text-xs text-[#CCFF00] block mb-1 uppercase tracking-widest font-bold">FUERZA</span>
                <div className="text-3xl font-extrabold text-white tracking-tight">24/7</div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#141414] p-8 lg:p-12 border border-[#262626] relative overflow-hidden shadow-2xl">
              
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[140px] text-[#CCFF00]">fitness_center</span>
              </div>

              {/* Header inside Form Container */}
              <header className="mb-10">
                <h1 className="text-3xl font-black uppercase italic tracking-tight text-white">
                  INICIAR SESIÓN
                </h1>
                <p className="text-sm text-[#c4c9ac] mt-2">Ingresa tus credenciales para acceder a la consola de élite.</p>
              </header>

              <form 
                className="relative z-10 space-y-6" 
                noValidate 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (checkemail()) {
                    handleLogin();
                  }
                }}
              >
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="email">Dirección de Email</label>
                  <InputField
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="password">Contraseña</label>
                  <InputField
                    type="password"
                    placeholder="CONTRASEÑA"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="pt-4 space-y-6">
                  {/* Submit Button */}
                  <button 
                    className="w-full bg-[#CCFF00] text-black font-bold py-5 uppercase tracking-[0.2em] hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-sm" 
                    type="submit"
                  >
                    INICIAR SESIÓN
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="text-sm text-[#c4c9ac]">
                      ¿NO TIENES UNA CUENTA? 
                      <Link 
                        to="/register" 
                        className="text-white font-bold border-b border-[#CCFF00] ml-2 hover:text-[#CCFF00] transition-colors"
                      >
                        REGISTRATE AQUÍ
                      </Link>
                    </p>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Login;