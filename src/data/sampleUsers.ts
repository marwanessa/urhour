import { User } from '../types/User';

export const sampleUsers: User[] = [
  {
    id: 'user-1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '(555) 123-4567',
    bio: 'Freelance designer and part-time baker. Love helping people with creative projects!',
    rating: 4.8,
    reviewCount: 12,
    location: 'Brooklyn, NY',
    joinedDate: '2023-01-15T00:00:00Z',
    tasksCompleted: 18,
    tasksPosted: 7
  },
  {
    id: 'user-2',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 987-6543',
    bio: 'Software engineer by day, DIY enthusiast by night. Happy to help with tech-related tasks!',
    rating: 4.5,
    reviewCount: 8,
    location: 'Austin, TX',
    joinedDate: '2023-02-20T00:00:00Z',
    tasksCompleted: 5,
    tasksPosted: 12
  },
  {
    id: 'user-3',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 456-7890',
    bio: 'Animal lover and vet assistant. Specialized in pet care tasks and services.',
    rating: 4.9,
    reviewCount: 15,
    location: 'Chicago, IL',
    joinedDate: '2022-11-05T00:00:00Z',
    tasksCompleted: 9,
    tasksPosted: 21
  },
  {
    id: 'user-4',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '(555) 789-0123',
    bio: 'Former mover, current fitness trainer. Excellent at heavy lifting and physical tasks.',
    rating: 4.7,
    reviewCount: 11,
    location: 'Chicago, IL',
    joinedDate: '2023-03-10T00:00:00Z',
    tasksCompleted: 24,
    tasksPosted: 3
  },
  {
    id: 'user-5',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    bio: 'Retired teacher with lots of free time. Enjoy helping with various tasks in my community.',
    rating: 4.6,
    reviewCount: 9,
    location: 'San Francisco, CA',
    joinedDate: '2022-12-18T00:00:00Z',
    tasksCompleted: 13,
    tasksPosted: 8
  }
];