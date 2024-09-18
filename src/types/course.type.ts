import { IUser } from "./user/user.type";

export interface ICourse {
  title: string;
  description: string;
  price: number;
  category: string;
  photoLink: string;
  rating: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  enrollments: IEnrollment[];
  chapters: IChapter[];
}

export interface IEnrollment {
  id: number;
  rating: number;
  review: string;
  user: IUser;
}

export interface IChapter {
  title: string;
  content: string;
  courseId: number;
  videoLink: number;
  index: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
