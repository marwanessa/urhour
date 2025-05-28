import { Task } from '../types/Task';

export const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Help moving furniture to new apartment',
    description: 'I need help moving my furniture from my current apartment to my new place. Items include a couch, bed, dresser, and some boxes. Both locations are within 3 miles of each other.',
    category: 'Moving',
    payment: 120,
    location: 'Brooklyn, NY',
    coordinates: {
      lat: 40.6782,
      lng: -73.9442
    },
    status: 'open',
    createdAt: '2023-09-15T14:30:00Z',
    dueDate: '2023-09-20T17:00:00Z',
    postedBy: {
      id: 'user-1',
      name: 'Emma Wilson',
      rating: 4.8,
      reviewCount: 12
    },
    tags: ['heavy lifting', 'furniture', 'weekend']
  },
  {
    id: 'task-2',
    title: 'House cleaning needed',
    description: 'Looking for someone to do a deep clean of my 2-bedroom apartment. Tasks include dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning.',
    category: 'Cleaning',
    payment: 80,
    location: 'Austin, TX',
    coordinates: {
      lat: 30.2672,
      lng: -97.7431
    },
    status: 'open',
    createdAt: '2023-09-16T10:15:00Z',
    postedBy: {
      id: 'user-2',
      name: 'Michael Brown',
      rating: 4.5,
      reviewCount: 8
    },
    tags: ['cleaning', 'housekeeping']
  },
  {
    id: 'task-3',
    title: 'Dog walking for the week',
    description: 'Need someone to walk my golden retriever once a day (around noon) for this work week while I\'m out of town. 30-minute walks in the neighborhood park.',
    category: 'Pet Care',
    payment: 100,
    location: 'Chicago, IL',
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    status: 'assigned',
    createdAt: '2023-09-14T09:45:00Z',
    dueDate: '2023-09-18T12:00:00Z',
    postedBy: {
      id: 'user-3',
      name: 'Sarah Johnson',
      rating: 4.9,
      reviewCount: 15
    },
    assignedTo: {
      id: 'user-4',
      name: 'David Miller',
      rating: 4.7,
      reviewCount: 11
    },
    tags: ['pet care', 'dog walking', 'daily']
  },
  {
    id: 'task-4',
    title: 'Grocery delivery needed',
    description: 'I need someone to pick up my grocery order from Whole Foods and deliver it to my apartment. Order is already placed for pickup.',
    category: 'Delivery',
    payment: 25,
    location: 'San Francisco, CA',
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    status: 'open',
    createdAt: '2023-09-17T15:20:00Z',
    postedBy: {
      id: 'user-5',
      name: 'James Wilson',
      rating: 4.6,
      reviewCount: 9
    },
    tags: ['delivery', 'groceries', 'same day']
  },
  {
    id: 'task-5',
    title: 'Fix leaky kitchen faucet',
    description: 'The kitchen faucet has been leaking for a few days. Need someone with plumbing experience to fix it. All necessary tools should be brought by you.',
    category: 'Handyman',
    payment: 75,
    location: 'Seattle, WA',
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    },
    status: 'open',
    createdAt: '2023-09-16T11:30:00Z',
    postedBy: {
      id: 'user-6',
      name: 'Emily Davis',
      rating: 4.7,
      reviewCount: 14
    },
    tags: ['repair', 'plumbing', 'home improvement']
  },
  {
    id: 'task-6',
    title: 'Help with lawn mowing and gardening',
    description: 'Need help with mowing the lawn, trimming hedges, and general garden cleanup. The yard is approximately 1/4 acre.',
    category: 'Other',
    payment: 60,
    location: 'Denver, CO',
    coordinates: {
      lat: 39.7392,
      lng: -104.9903
    },
    status: 'open',
    createdAt: '2023-09-15T08:45:00Z',
    postedBy: {
      id: 'user-7',
      name: 'Robert Taylor',
      rating: 4.4,
      reviewCount: 7
    },
    tags: ['yard work', 'gardening', 'outdoor']
  }
];