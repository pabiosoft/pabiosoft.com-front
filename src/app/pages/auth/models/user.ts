export interface User {
  id: number | any;
  email: string;
  password: string;
  firstName?: string; 
  lastName?: any;
  pseudo?: string;
  role: 'admin' | 'user';
  profile?: { imageUrl?: string | any }; 
}
