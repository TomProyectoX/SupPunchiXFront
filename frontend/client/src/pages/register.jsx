import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import InputField from '../assets/components/react/InputField';
// react-toastify removed — using inline errors only
function Register() {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const role = "USER"

               

            const handleSubmit = async (e) => {
            e.preventDefault();

            // reseteamos los errores para que desaparezcan cuando el usuario ingresa los caracteres validos
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

            // password validation: mínimo 8 caracteres
            if (!password || password.length < 8) {
                setPasswordError('La contraseña debe tener al menos 8 caracteres');
                
                return;
            }

            
            
            try {

    {
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
}

                
            } catch (error) {
                
            }

        };
  return (
   <>
    <div className="register-page">
        <div className="left-section">
            <div className="header">
                <div className="logo">SUPLEMENTOS PUNCHIS</div>
    
            </div>

            <div className="left-content">
                <div className="est-badge">EST. MMXXIV</div>
                <h1 className="main-title">
                    JOIN THE
                    <span className="highlight">PUNCHI</span>
                </h1>
                <p className="description">
                    Precision engineering for high-performance athletes. Lock in your credentials and access the inner circle of elite performance gear.
                </p>

                <div className="stats">
                    <div className="stat">
                        <div>
                            <div className="stat-label">MIEMBROS</div>
                            <div className="stat-value">50K+</div>
                        </div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <div>
                            <div className="stat-label">PRECISION</div>
                            <div className="stat-value">100%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-text">PUNCHIS</div>
        </div>

       
        <div className="right-section">
            <div className="logo-icon">⚡</div>
            
            <div className="form-container">
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>FIRST NAME</label>
                            <InputField
                                type="text"
                                placeholder="NOMBRE"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>LAST NAME</label>
                            <InputField
                                type="text"
                                placeholder="APELLIDO"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>EMAIL ADDRESS</label>
                        <InputField
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                        />
                    </div>

                    <div className="form-group">
                        <label>PASSWORD</label>
                        <InputField
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError}
                        />
                    </div>

                   

                    <button type="submit" className="submit-btn" >
                        CREATE ELITE ACCOUNT 
                        <span className="lightning">⚡</span>
                    </button>

                    <div className="login-link">
                        ALREADY PART OF THE TEAM? <Link to="http://localhost:5173/login">LOGIN HERE</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
   
    </>
  );

}
export default Register;