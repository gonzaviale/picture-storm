import React from "react";
import { useNavigate } from 'react-router-dom';

const ProfileIcon: React.FC = () => {
     const navigate = useNavigate();

    return (
        <div className="absolute top-4 right-4 flex items-center z-10">
            {!sessionStorage.getItem('token') && (
                <button
                    className="text-white border-2 border-white p-2 hover:bg-white hover:text-black transition duration-300"
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </button>
            )}
        </div>
    );
};

export default ProfileIcon;
