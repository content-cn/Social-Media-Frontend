import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostsContext } from '../Context/PostContext';
const PostForm = () => {
  const [content, setContent] = useState('');

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const { addPost } = useContext(PostsContext);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
      if (!token) {
        console.error('User is not logged in');
        return;
      }

      // Make API request to create post with JWT token in headers
      const response = await axios.post('http://localhost:5000/api/posts', {
        content: content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Post created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      addPost(response.data);
      // Clear input field after successful submission
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create a Post</h5>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
