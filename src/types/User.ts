export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  location?: string;
  joinedDate: string;
  tasksCompleted?: number;
  tasksPosted?: number;
}