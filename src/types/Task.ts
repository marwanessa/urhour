import { User } from './User';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  payment: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  dueDate?: string;
  postedBy: {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
  };
  assignedTo?: {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
  };
  attachments?: string[];
  tags?: string[];
}