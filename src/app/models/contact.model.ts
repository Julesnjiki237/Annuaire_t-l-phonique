export interface Contact {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  company?: string;
  category?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactResponse {
  success: boolean;
  data: Contact | Contact[];
  message?: string;
}