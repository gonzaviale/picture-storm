import { UserIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        setShowDropdown(false);
        navigate('/login');
    };

    return (
        <>
            <div className="absolute top-4 left-4 flex items-center z-10">
                <div className='relative'>
                    <button
                        className="p-2"
                        onClick={() => navigate('/')}
                    >
                        <HomeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center z-10">
                {!sessionStorage.getItem('token') && (
                    <button
                        className="text-white border-2 border-white p-2 hover:bg-white hover:text-black transition duration-300"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </button>
                )}
                {sessionStorage.getItem('token') && (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="p-2"
                        >
                            <UserIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                        {showDropdown && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-20"
                            >
                                <button
                                    className="block px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-200 w-full text-left"
                                    onClick={() => navigate('/saved-pictures')}
                                >
                                    Favoritas
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-200 w-full text-left"
                                    onClick={() => logout()}
                                >
                                    Cerrar Sesión
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-200 w-full text-left"
                                    onClick={() => navigate('/my-pictures')}
                                >
                                    Mis Imagenes
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
