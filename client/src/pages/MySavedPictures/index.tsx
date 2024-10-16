import { fetchUserSavedPictures, removeSavedPicture } from "../../api/userApi";
import { PaginateResponse, Picture } from "../../types";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import PictureCard from "../../components/PictureCard";
import HeroImage from "../../components/HeroImage";
import Header from "../../layout/Header";
import { useNavigate, useLocation } from "react-router-dom";


const MySavedPictures: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [paginationResponse, setPaginationResponse] = useState<PaginateResponse | null>(null);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const fetchedPictures = await fetchUserSavedPictures(1);
          setPictures(fetchedPictures.pictures);
          setPaginationResponse(fetchedPictures);
        }
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };
    fetchPictures();
  }, []);

  const handleDelete = async (pictureId: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        await removeSavedPicture(pictureId);
      }
    } catch (error) {
      console.error("Error deleting picture:", error);
    }
  };

  const paginate = async (pageNumber: number) => {
    try {
      const fetchedPictures = await fetchUserSavedPictures(pageNumber);
      setPictures(fetchedPictures.pictures);
      setPaginationResponse(fetchedPictures);
    } catch (error) {
      console.error("Error fetching pictures:", error);
    }
  };

  return (
    <>
      <div>
        <HeroImage />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          <Header />
          <h1 className="text-4xl font-bold mb-4 mt-20 animate-fade-in-down">Favoritas</h1>

          {pictures.length === 0 ? (
            <div className="flex justify-center items-centers h-20 mt-4">
              <h1 className="text-2xl font-bold">No tienes ninguna imagen guardada</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
              {pictures.map((picture) => (
                <div
                  key={picture._id}
                  className="bg-white/50 p-2 rounded-lg shadow-md zoom"
                >
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
                        Swal.fire({
                          icon: 'success',
                          title: 'Imagen eliminada',
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(() => {
                          navigate(`${location.pathname}?reload=${new Date().getTime()}`);
                        });
                      }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination
            currentPage={paginationResponse?.currentPage || 1}
            totalPictures={paginationResponse?.totalCount || 0}
            picturesPerPage={3}
            paginate={paginate}
          />
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
};

export default MySavedPictures;
