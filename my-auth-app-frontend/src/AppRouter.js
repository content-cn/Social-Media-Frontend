import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';
import ProtectedRoute from './Auth/ProtectedRoute';
import Feed from './Pages/Feed';


const AppRouter = () => {
  return (
    <Routes>
      <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      <Route exact path="/signup" element={ <Signup /> } />
      <Route exact path="/signin" element={ <Signin /> } />
    </Routes>
  );
};

export default AppRouter;
