export interface Organization {
  _id: string;
  name: string;
  address: string;
  __v: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  __v: number;
}
