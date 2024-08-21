export interface ICourse {
  title: string;
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

export interface IEnrollment {}

export interface IChapter {}
