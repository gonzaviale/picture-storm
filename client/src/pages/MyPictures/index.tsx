import { useEffect, useState } from "react";
import { fetchUserPictures } from "../../api/userApi";
import { Picture } from "../../types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { deletePicture, fetchPictureiD } from "../../api/pictureApi";
import UpdatePicture from "../UpdatePicture";
import HeroImage from "../../components/HeroImage";
import Header from "../../layout/Header";

const MyPictures: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const fetchedPictures = await fetchUserPictures();
          setPictures(fetchedPictures);
        }
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };
    fetchPictures();
  }, []);

  const handleDelete = async (pictureId: string) => {
    try {
      await deletePicture(pictureId);
      Swal.fire({
        icon: 'success',
        title: 'Imagen eliminada',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error deleting picture:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la imagen',
      });
    }
  }

  const handleUpdate = async (_id: string) => {
    try {
      const picture = await fetchPictureiD(_id);
      if (picture) {
        setSelectedPicture(picture);
        setIsUpdateMode(true);
      }
    } catch (error) {
      console.error('Error updating picture:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la imagen',
      });
    }
  }


  return (
    <>
      <div>
        <HeroImage />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          <Header />
          <h1 className="text-4xl font-bold mb-4 mt-20 animate-fade-in-down">Mis Imágenes</h1>

          {isUpdateMode && selectedPicture ? (
            <UpdatePicture id={selectedPicture._id as string} picture={selectedPicture} />
          ) : (
            <>
              {pictures.length === 0 ? (
                <div className="flex justify-center items-center h-20 mt-4">
                  <h1 className="text-2xl font-bold">No tienes ninguna imagen guardada</h1>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
                  {pictures.map((picture) => (
                    <div
                      key={picture._id}
                      className="bg-white/50 p-2 rounded-lg shadow-md zoom"
                    >
                      <button
                        className="flex items-center justify-center bg-blue-500 text-white w-14 h-10 rounded-lg mb-2 hover:bg-blue-600 transition duration-300"
                        onClick={(e) => {
                          handleUpdate(picture._id as string);
                          e.stopPropagation();
                        }}
                      >
                        <PencilIcon className="w-7 h-7 text-white" />
                      </button>
                      <img
                        src={picture.image}
                        alt={picture.description}
                        onClick={() => setSelectedPicture(picture)}
                        className="w-full h-36 object-cover rounded-md cursor-pointer"
                      />
                      <div className="flex flex-row justify-between items-center mt-3">
                        <p className="text-black font-semibold text-normal">
                          {picture.description.length > 45
                            ? `${picture.description.substring(0, 45)}...`
                            : picture.description}
                        </p>
                        <button
                          className="flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600 transition duration-300"
                          onClick={(e) => {
                            handleDelete(picture._id as string);
                            e.stopPropagation();
                          }}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

}

export default MyPictures;