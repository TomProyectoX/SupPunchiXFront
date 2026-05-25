import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import InputField from '../assets/components/react/InputField';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const role = "USER";

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

    try {
      const response = await fetch('http://localhost:4002/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Forzamos de forma limpia la tipografía que usás en 'main-title' desde tu Register.css
  const welcomeFont = { fontFamily: "inherit" }; 

  return (
    <div className="bg-[#0A0A0A] text-[#e5e2e1] min-h-screen flex flex-col font-body-md selection:bg-[#CCFF00] selection:text-black">
      
      {/* Top Navigation Anchor */}
      <div className="w-full flex items-center px-6 h-16 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#CCFF00] font-headline-md text-xs uppercase tracking-[0.2em] hover:text-white transition-colors group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            chevron_left
          </span> 
          VOLVER AL INICIO
        </Link>
      </div>

      {/* Main Registration Canvas */}
      <main className="flex-grow flex items-center justify-center pb-16 px-6">
        <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Branding & Energy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
            <div className="space-y-4">
              <span className="bg-[#CCFF00] text-black font-label-bold text-xs px-3 py-1 inline-block uppercase tracking-wider font-bold">
                FUN. 2026
              </span>
              <h1 
                className="text-5xl md:text-6xl lg:text-[76px] text-white uppercase italic leading-none font-black tracking-tighter"
                style={welcomeFont}
              >
                UNITE A LA<br />
                <span className="text-[#CCFF00]">ÉLITE.</span>
              </h1>
              <p className="font-body-lg text-[16px] leading-relaxed text-[#c4c9ac] max-w-md opacity-90">
              Creá tu cuenta para acceder a suplementos exclusivos, gestionar pedidos y formar parte de la comunidad Punchis.              </p>
            </div>

            {/* Bento Metric Highlighting Elite Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141414] border-l-4 border-[#CCFF00] p-6">
                <span className="font-label-bold text-xs text-[#CCFF00] block mb-1 uppercase tracking-widest font-bold">MIEMBROS</span>
                <div className="text-3xl font-extrabold text-white tracking-tight">50K+</div>
              </div>
              <div className="bg-[#141414] border-l-4 border-[#CCFF00] p-6">
                <span className="font-label-bold text-xs text-[#CCFF00] block mb-1 uppercase tracking-widest font-bold">CALIDAD</span>
                <div className="text-3xl font-extrabold text-white tracking-tight">100%</div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#141414] p-8 lg:p-12 border border-[#262626] relative overflow-hidden shadow-2xl">
              
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[140px] text-[#CCFF00]">fitness_center</span>
              </div>

              <form className="relative z-10 space-y-6" noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="first-name">Nombre</label>
                    <InputField
                      type="text"
                      placeholder="INGRESÁ TU NOMBRE"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="last-name">Apellido</label>
                    <InputField
                      type="text"
                      placeholder="INGRESÁ TU APELLIDO"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="email">Correo Electrónico</label>
                  <InputField
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="font-label-bold text-xs text-[#CCFF00] uppercase tracking-widest block font-bold" htmlFor="password">Contraseña</label>
                  <InputField
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                  />
                </div>

                <div className="pt-4 space-y-6">
                  {/* Submit Button */}
                  <button 
                    className="w-full bg-[#CCFF00] text-black font-bold py-5 uppercase tracking-[0.2em] hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-sm" 
                    type="submit"
                  >
                    CREAR CUENTA
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-[#c4c9ac]">
                      ¿YA TENÉS UNA CUENTA?
                      <Link 
                        to="http://localhost:5173/login" 
                        className="text-white font-bold border-b border-[#CCFF00] ml-2 hover:text-[#CCFF00] transition-colors"
                      >
                        INICIÁ SESIÓN
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

export default Register;