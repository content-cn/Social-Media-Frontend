import React, { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../Context/PostContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const FeedList = () => {
    const { posts, setPosts } = useContext(PostsContext);
    const jwtToken = localStorage.getItem('jwtToken');

    const handleLike = async (postId) => {
        try {
            const response = await fetch('http://localhost:5000/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ postId })
            });

            if (response.ok) {
                // Update the posts array to reflect the new like
                const updatedPosts = posts.map(post => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            currentUserLiked: true,
                            likesCount: post.likesCount + 1
                        };
                    }
                    return post;
                });
                console.log(updatedPosts)
                setPosts(updatedPosts);
            } else {
                throw new Error('Failed to like the post');
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleUnlike = async (postId) => {
        try {
            const response = await fetch('http://localhost:5000/api/likes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ postId })
            });

            if (response.ok) {
                // Update the posts array to reflect the removed like
                const updatedPosts = posts.map(post => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            currentUserLiked: false,
                            likesCount: post.likesCount - 1
                        };
                    }
                    return post;
                });
                setPosts(updatedPosts);
            } else {
                throw new Error('Failed to unlike the post');
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    // Rest of the code...
    return (
        <div className="container mt-5">
            <h2>Feed</h2>
            {posts.map(post => (
                <div key={post._id} className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{post.user.email}</h5>
                        <p className="card-text">{post.content}</p>
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="mr-2">
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    size="lg"
                                    style={{ color: post.currentUserLiked ? 'blue' : 'black', cursor: 'pointer' }}
                                    onClick={() => {
                                        if (post.currentUserLiked) {
                                            handleUnlike(post._id);
                                        } else {
                                            handleLike(post._id);
                                        }
                                    }}
                                />
                            </div>
                            <p className="mb-0" style={{ marginLeft: '5px' }}>{post.likesCount}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedList;
