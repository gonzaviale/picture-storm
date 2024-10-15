import React, { useEffect, useState } from 'react';
import ProfileIcon from '../../layout/Header';
import HeroImage from '../../components/HeroImage';
import MoreAndCreateButtons from '../../components/MoreAndCreateButtons';
import { Picture } from '../../types';
import { fetchPictures } from '../../api/pictureApi';
import { BookmarkIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {

    const [searchText, setSearchText] = useState<string>('');
    const [filteredPictures, setFilteredPictures] = useState<Picture[]>([]);

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const fetchInitialPictures = async () => {
            const pictures = await fetchPictures();
            setFilteredPictures(pictures);
        };
        fetchInitialPictures();
    }, []);

    useEffect(() => {
        const fetchSearchPictures = async () => {
            const picturesSearch = await fetchPictures();
            if (searchText) {
                setFilteredPictures(picturesSearch.filter((picture) =>
                    picture.description.toLowerCase().includes(searchText.toLowerCase())
                ));
            }
            if (searchText.length === 0) {
                setFilteredPictures(picturesSearch);
            }
        };
        fetchSearchPictures();
    }, [searchText]);



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
                            onChange={(e) => { handleChangeText(e) }}
                        />
                    </div>
                    <MoreAndCreateButtons />
                    <div
                        id="exploreMoreSection"
                        className="mt-8 w-full transition-opacity duration-500 px-4 md:px-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {filteredPictures.map((picture) => (
                                <div key={picture._id} className="bg-white/50 p-2 rounded-lg shadow-md zoom">
                                    <img
                                        src={picture.image}
                                        alt={picture.description}
                                        className="w-full h-36 object-cover rounded-md cursor-pointer"
                                    />
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-black font-semibold mt-3 text-normal">
                                            {picture.description.length > 45
                                                ? `${picture.description.substring(0, 45)}...`
                                                : picture.description}
                                        </p>
                                        <button
                                            className="mt-3 flex items-center justify-center bg-blue-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            <BookmarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
