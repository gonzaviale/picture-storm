import mongoose from 'mongoose';
import Picture from '../models/Picture';
import { searchPictures } from '../services/unsplashService';

const mongoURL = process.env.MONGO_URL;

const connectDataBase = async () => {
  try {
    await mongoose.connect(mongoURL!, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Conectado a MongoDB');

    const picturesC = await Picture.countDocuments();

    if (picturesC === 0) {
      try {
        const pictures = await searchPictures('computadora');

        for (let picture of pictures) {
          const newPicture = new Picture({
            description: picture.description || `Imagen de ${picture.createdBy}`,
            altDescription: picture.altDescription || `Imagen de ${picture.createdBy}`,
            color: picture.color,
            image: picture.image,
            likes: picture.likes,
            createdBy: picture.createdBy,
            createdAt: picture.created_at,
          });

          await newPicture.save();
        }

        console.log('la base de datos fue cargada con exito');
      } catch (err) {
        console.error('Error al insertar datos:', err);
      }
    } else {
      console.log('La base de datos ya contiene datos.');
    }
  } catch (error) {
    console.log(error);

    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDataBase;