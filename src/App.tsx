import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TaskMap from './pages/TaskMap';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import Profile from './pages/Profile';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<TaskMap />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </Layout>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;