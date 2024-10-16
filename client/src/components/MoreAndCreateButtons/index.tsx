import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoreAndCreateButtons: React.FC = () => {

    const navigate = useNavigate();


    const handleExternalApi = () => {
        if (sessionStorage.getItem('token')) {
            navigate('/external-pictures');
        } else {
            navigate('/login');
        }
    }

    const handleCreatePicture = () => {
        if (sessionStorage.getItem('token')) {
            navigate('/create-picture');
        } else {
            navigate('/login');
        }
    }
    return (
        <div className='flex justify-center gap-3'>
            <button
                className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
                id="exploreMoreButton"
                onClick={handleExternalApi}
            >
                Explorar más
            </button>
            {sessionStorage.getItem('token') && (
                <button
                    className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
                    id="exploreMoreButton"
                    onClick={handleCreatePicture}
                >
                    Subí tu imagen
                </button>
            )}
        </div>
    );
};

export default MoreAndCreateButtons;