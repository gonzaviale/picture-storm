import Swal from "sweetalert2";
import { createPicture } from "../../api/pictureApi";
import Header from "../../layout/Header";
import React, { useState } from "react";
import HeroImage from "../../components/HeroImage";
import { useNavigate } from "react-router-dom";

const CreatePicture: React.FC = () => {
    const [description, setDescription] = useState('');
    const [altDescription, setAltDescription] = useState('');
    const [image, setImage] = useState('');
    const [color, setColor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                await createPicture({ description, altDescription, image, color });
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen agregada exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    navigate('/');
                })
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
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
                <div className="relative w-full h-screen bg-gray-200 overflow-hidden">
                    <HeroImage />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <Header />
                        <div className="max-w-2xl w-full bg-white/50 rounded-3xl shadow-xl p-8 overflow-y-auto max-h-screen">
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
                                    Crear imagen
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatePicture;
