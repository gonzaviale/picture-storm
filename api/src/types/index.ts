export interface PictureInterface {
    description: string;
    altDescription: string;
    color: string;
    image: string;
    likes: number;
    createdBy: string;
    createdAt: Date;
  }
  

  export interface PictureResponse {
    savedPictures: any[];
    totalCount: number;
  }