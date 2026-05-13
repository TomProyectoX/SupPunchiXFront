import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const checkemail = () => {
  console.log(typeof email);
 if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
  return false;
}
  if (email.trim() === '') {
    alert('El campo de correo electrónico no puede estar vacío.');
    return false;
  }
return true}









  return (
    <div className="flex h-screen">

      <div className="left-panel w-1/2 flex ">
       <div className="inset-0 bg-black/60">
        <div className="w-full h-full flex flex-col justify-center px-16">
  
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
          <input type="text" placeholder='Username' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-4 rounded-lg bg-gray-800 text-white mb-4' />
          <input type="password" placeholder='Password' className='w-full p-4 rounded-lg bg-gray-800 text-white mb-6' />
          <button 
          onClick={checkemail}
          
          className='w-full p-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-500 transition-colors'>Iniciar Sesión</button>
          <p className='text-center text-gray-300 mt-6 hover:text-lime-400 cursor-pointer transition-colors'>Registrate</p>
        </div>
      </div>
    </div>
  );
}

export default App
