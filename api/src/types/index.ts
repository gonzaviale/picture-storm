export interface PictureInterface {
    description: string;
    altDescription: string;
    color: string;
    image: string;
    likes: number;
    createdBy: string;
    createdAt: Date;
  }
  
  interface Picture{
    _id?: any;
    id?: any;
    description: string;
    altDescription: string;
    color: string;
    image: string;
    likes: number;
    createdBy: string;
    createdAt: Date;
  }

  export interface PaginateResponse {
    pictures: Picture[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }