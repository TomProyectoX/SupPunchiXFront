import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import InputField from '../assets/components/react/InputField';
import { registerUser } from '../Redux/slices/authSlice';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('El correo es obligatorio');
      return;
    } 

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError('El correo no es válido');
      return;
    }

    if (!password || password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    dispatch(registerUser({ firstName, lastName, email, password }));
  };

  return (
    <div className="relative bg-[#0A0A0A] text-[#e5e2e1] min-h-screen flex flex-col font-body-md overflow-hidden selection:bg-[#CCFF00] selection:text-black">

      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#CCFF00] blur-[160px] opacity-[0.07] pointer-events-none" />

      <div className="relative z-10 w-full flex items-center px-6 h-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#CCFF00] text-xs uppercase tracking-[0.2em] font-black hover:text-white transition-colors group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            chevron_left
          </span> 
          Inicio
        </Link>
      </div>

      <main className="relative z-10 flex-grow flex items-center justify-center py-12 px-6">
        <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LADO IZQUIERDO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-[#CCFF00] text-xs font-black uppercase tracking-[0.3em] mb-2">
                Unite a la familia
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white uppercase italic leading-[0.95] font-black tracking-tighter">
                Creá tu<br />
                <span className="text-[#CCFF00]">Cuenta</span>
              </h1>
            </div>

            <div className="border-l-2 border-[#CCFF00] pl-5 py-1">
              <p className="text-lg md:text-xl text-white font-bold leading-snug italic">
                "Sin atajos. Sin excusas.{' '}
                <span className="text-[#CCFF00]">Solo resultados.</span>"
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Suplementos importados, certificados, para quienes entrenan en serio.
              </p>
            </div>

            <p className="text-base leading-relaxed text-gray-400 max-w-md">
              Ingeniería de precisión para atletas de alto rendimiento. Asegurá tus credenciales y accedé al círculo exclusivo de equipamiento de élite.
            </p>
          </motion.div>

          {/* LADO DERECHO: FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#141414] rounded-2xl p-8 lg:p-12 border border-[#262626] relative overflow-hidden shadow-2xl">

              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#CCFF00] rounded-full blur-[100px] opacity-10 pointer-events-none" />

              <header className="relative z-10 mb-8">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white">Crear Cuenta</h2>
                <p className="text-sm text-gray-400 mt-2">Completá tus datos para unirte a la familia Punchis.</p>
              </header>

              <form className="relative z-10 space-y-5" noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs text-[#CCFF00] uppercase tracking-widest block font-black" htmlFor="first-name">Nombre</label>
                    <InputField
                      type="text"
                      placeholder="Tu nombre"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-[#CCFF00] uppercase tracking-widest block font-black" htmlFor="last-name">Apellido</label>
                    <InputField
                      type="text"
                      placeholder="Tu apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#CCFF00] uppercase tracking-widest block font-black" htmlFor="email">Email</label>
                  <InputField
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError || error}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#CCFF00] uppercase tracking-widest block font-black" htmlFor="password">Contraseña</label>
                  <InputField
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                  />
                </div>

                <div className="pt-2 space-y-5">
                  <button 
                    className="w-full bg-[#CCFF00] text-black font-black py-4 rounded-lg uppercase tracking-[0.15em] hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-sm" 
                    type="submit"
                  >
                    Crear Cuenta
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">bolt</span>
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      ¿Ya tenés una cuenta?{' '}
                      <Link 
                        to="/login" 
                        className="text-white font-black border-b border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                      >
                        Iniciá sesión aquí
                      </Link>
                    </p>
                  </div>
                </div>
              </form>

            </div>
          </motion.div>

        </div>
      </main>

    </div>
  );
}

export default Register;