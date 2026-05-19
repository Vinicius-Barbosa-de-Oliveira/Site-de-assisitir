export interface Genrex {
  id: string;
  name: string;
}

export interface Dramax {
  id: string;
  title: string;
  slug: string;

  description: string;

  rating: number;

  coverImage: string;

  year?: number;

  country?: string;

  status?: string;

  episodes?: {
    number: number;
  }[];

  genres: Genrex[];
}