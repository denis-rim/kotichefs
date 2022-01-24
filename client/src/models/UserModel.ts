export interface UserModelPublic {
  id: string;
  fullName: string;
  photo_url: string;
  verified: boolean;
  role: string;
  isAdmin: boolean;
}

export interface UserModelPrivate {
  id: string;
  fullName: string;
  email: string;
  city: string;
  photo_url: string;
  role: string;
  orders: [];
  products: [];
  cosine: [];
  promoted: [];
  about: string;
  phone: string;
  rating: number;
  verified: boolean;
  isAdmin: boolean;
}
