import React from 'react';
import ProfileIcon from '../../components/Profile';
import HeroImage from '../../components/HeroImage';
import MoreAndCreateButtons from '../../components/MoreAndCreateButtons';

const Home: React.FC = () => {

    return (
        <>
            <div>
                <HeroImage />
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
                    <div
                        id="exploreMoreSection"
                        className="mt-8 w-full transition-opacity duration-500 px-4 md:px-8"
                    >
                        <ProfileIcon />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 mt-20 animate-fade-in-down">Picture Storm</h1>
                    <p className="text-base mb-6">Capture, explore y guarde momentos hermosos</p>
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden w-2/3 md:w-1/3">
                        <input
                            type="text"
                            placeholder="Buscar imagenes..."
                            className="w-full px-4 py-2 text-black focus:outline-none"
                        />
                    </div>
                    <MoreAndCreateButtons />
                </div>
            </div>
        </>
    );
};

export default Home;
