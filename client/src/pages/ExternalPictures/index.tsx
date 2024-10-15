import React, { useState } from "react";
import { addPictureExternal, searchExternalPictures } from "../../api/pictureApi";
import { Picture } from "../../types";
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import PictureCard from "../../components/PictureCard";
import HeroImage from "../../components/HeroImage";
import Header from "../../layout/Header";

const ExternalPictures: React.FC = () => {
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [picturesPerPage] = useState<number>(3);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearch = async () => {
        try {
            const response = await searchExternalPictures(searchText);
            setPictures(response);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (pictureId: string) => {
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                await addPictureExternal(pictureId);
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen agregada exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error saving picture:', error);
            if (error instanceof Error && error.message === 'Imagen ya existente') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La imagen ya existe en tu biblioteca',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al agregar la imagen',
                });
            }
        }

    };

    const indexOfLastPicture = currentPage * picturesPerPage;
    const indexOfFirstPicture = indexOfLastPicture - picturesPerPage;
    const currentPictures = pictures.slice(indexOfFirstPicture, indexOfLastPicture);

    return (
        <>
            <div>
                <HeroImage />
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
                    <Header />
                    <h1 className="text-4xl font-bold mb-4 mt-20 animate-fade-in-down">Picture Storm</h1>
                    <p className="text-base mb-6">Capture, explore y guarde momentos hermosos</p>
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden w-2/3 md:w-1/3">
                        <input
                            type="text"
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Buscar imagenes externas..."
                            className="w-full px-4 py-2 text-black focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div
                        id="exploreMoreSection"
                        className="mt-8 w-full transition-opacity duration-500 px-4 md:px-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {currentPictures.map((picture) => (
                                <div key={picture.id} className="bg-white/50 p-2 rounded-lg shadow-md zoom">
                                    <img
                                        src={picture.image}
                                        alt={picture.description}
                                        className="w-full h-36 object-cover rounded-md cursor-pointer"
                                        onClick={() => setSelectedPicture(picture)}
                                    />
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-black font-semibold mt-3 text-normal">
                                            {picture.description.length > 45
                                                ? `${picture.description.substring(0, 45)}...`
                                                : picture.description}
                                        </p>
                                        <button
                                            className="mt-3 flex items-center justify-center bg-blue-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600 transition duration-300"
                                            onClick={() => handleSave(picture.id as string)}
                                        >
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPictures={pictures.length}
                            picturesPerPage={picturesPerPage}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>
            {selectedPicture && (
                <PictureCard
                    picture={selectedPicture}
                    setSelectedPicture={setSelectedPicture}
                />
            )}
        </>
    );
}

export default ExternalPictures;
