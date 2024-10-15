import { XMarkIcon } from '@heroicons/react/24/solid';
import { Picture, PictureCardProps } from "../../types";
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import BigPictureCard from '../BigPictureCard';

const PictureCard: React.FC<PictureCardProps> = ({ picture, setSelectedPicture }) => {
    const close = () => setSelectedPicture(null);
    const [selectBigPicture, setSelectBigPicture] = useState<Picture | null>(null);
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md h-96 flex flex-col">
                <img
                    src={picture.image}
                    alt={picture.description}
                    onClick={() => setSelectBigPicture(picture)}
                    className="h-48 w-full object-cover cursor-pointer"
                />
                <div className="p-4 flex-1 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-2">{picture.description}</h2>
                    <p className="text-gray-600 mb-1"><strong>Descripción alternativa:</strong> {picture.altDescription}</p>
                    <p className="text-gray-600 mb-1"><strong>Color:</strong> {picture.color}</p>
                    <p className="text-gray-600 mb-1 flex items-center">
                        <HandThumbUpIcon className="h-5 w-5 text-blue-500" />
                        <span className="ml-1">{picture.likes?picture.likes:0}</span>
                    </p>
                    <p className="text-gray-600"><strong>Creado por:</strong> {picture.createdBy}</p>
                </div>
            </div>
            <button
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-3 hover:bg-red-700 z-10"
                onClick={close}
            >
                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
            </button>
            {selectBigPicture && (
                <BigPictureCard
                    picture={selectBigPicture}
                    setSelectBigPicture={setSelectBigPicture}
                />
            )}
        </div>
    );
};

export default PictureCard;
