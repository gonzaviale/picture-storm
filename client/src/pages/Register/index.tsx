import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/userApi';
import HeroImage from '../../components/HeroImage';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });
            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido creada con éxito.',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                navigate('/login');
            });
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'Credenciales inválidas. Por favor intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Reintentar'
            });
            setError('Hubo un error al registrarte');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <HeroImage />
            <div className="relative w-full max-w-lg p-10 space-y-8 bg-white/50 rounded-3xl shadow-xl">
                <h1 className="text-4xl font-bold text-center text-gray-800">Registro</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;