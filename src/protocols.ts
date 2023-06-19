export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type UpsertTutorialInput = {
  id?: number | null;
  userId: number;
  resultUrl: string;
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  category: string;
};
