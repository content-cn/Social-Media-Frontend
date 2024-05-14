import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const cacheKey = 'postsCache';
  const cacheExpiration = 10 * 60 * 1000; // 10 minutes in milliseconds

  useEffect(() => {
    console.log("Calling useeffect", posts, token);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
        setLoading(false);
        localStorage.setItem(cacheKey, JSON.stringify({
          data: response.data,
          timestamp: Date.now()
        }));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < cacheExpiration) {
        setPosts(data);
        setLoading(false);
      } else {
        localStorage.removeItem(cacheKey);
        fetchPosts();
      }
    } else {
      fetchPosts();
    }
  }, [token]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, loading, error, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };
