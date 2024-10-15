export interface Picture {
  _id?: string;
  id?: string;
  description: string;
  altDescription?: string;
  color: string;
  image: string;
  likes?: number;
  createdBy?: string;
  createdAt?: Date;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface PictureCardProps {
  picture: Picture;
  setSelectedPicture: (picture: Picture | null) => void;
}

export interface BigPictureCardProps {
  picture: Picture;
  setSelectBigPicture: (picture: Picture | null) => void;
}

 export interface PaginationProps {
  currentPage: number;
  totalPictures: number;
  picturesPerPage: number;
  paginate: (pageNumber: number) => void;
}

export interface PaginateResponse {
  pictures: Picture[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}