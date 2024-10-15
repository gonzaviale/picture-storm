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