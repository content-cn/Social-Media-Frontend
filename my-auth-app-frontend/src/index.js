import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { PostsProvider } from './Context/PostContext';

ReactDOM.render(
  <Router>
    <React.StrictMode>
    <PostsProvider>
      <App />
      </PostsProvider>
      
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
