import { XMarkIcon } from '@heroicons/react/24/solid';
import { BigPictureCardProps } from "../../types"

const BigPictureCard: React.FC<BigPictureCardProps> = ({ picture, setSelectBigPicture }) => {
    const close = () => setSelectBigPicture(null);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={picture.image}
                    alt={picture.description}
                    className="bigPicture w-full object-cover"
                />
            </div>
            <button
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-3 hover:bg-red-700 z-10"
                onClick={close}
            >
                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
            </button>
        </div>
    );

}

export default BigPictureCard;