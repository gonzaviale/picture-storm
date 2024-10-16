import Swal from "sweetalert2";
import { updatePicture } from "../../api/pictureApi";
import React, { useState } from "react";
import { Picture } from "../../types";
import { useNavigate } from "react-router-dom";

const UpdatePicture: React.FC<{ id: string, picture: Picture }> = ({ id, picture }) => {
    const [description, setDescription] = useState(picture.description);
    const [altDescription, setAltDescription] = useState(picture.altDescription);
    const [image, setImage] = useState(picture.image);
    const [color, setColor] = useState(picture.color);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedPicture = { description, altDescription, image, color };
            const token = sessionStorage.getItem('token');
            if (token) {
                await updatePicture(id, updatedPicture);
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen actualizada exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    navigate('/');
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal',
            });
        }
    };


    return (
        <div className="max-w-2xl w-full bg-white/50 rounded-3xl shadow-xl p-8 overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Ingresa una descripción..."
                   className="w-full text-black px-6 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 resize-none"
                   rows={2}
                   />
                <textarea
                     value={altDescription}
                     onChange={(e) => setAltDescription(e.target.value)}
                     placeholder="Ingresa una descripción alternativa..."
                     className="w-full text-black px-6 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 resize-none"
                     rows={2}
                     />
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Ingresa la url de la imagen..."
                    className="w-full text-black px-6 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Ingresa el color predominante en hexadecimal..."
                    className="w-full text-black px-6 py-3 text-lg border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Actualizar Imagen
                </button>
            </form>
        </div>
    )
}

export default UpdatePicture