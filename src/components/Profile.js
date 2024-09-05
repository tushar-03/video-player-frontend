import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleProfilePicUpload = async (event) => {
        const formData = new FormData();
        formData.append('profilePic', event.target.files[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/user/profile/upload-pic', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update user profile picture
            setUser(prevUser => ({
                ...prevUser,
                profilePic: response.data.profilePic,
            }));

            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Failed to upload profile picture.');
        }
    };

    const handleVideoUpload = async () => {
        const formData = new FormData();
        formData.append('video', selectedVideo);
        formData.append('title', videoTitle);
        formData.append('description', videoDescription);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/user/profile/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update user videos
            setUser(prevUser => ({
                ...prevUser,
                videos: [...prevUser.videos, response.data.video],
            }));

            setShowUploadModal(false);
            alert('Video uploaded successfully!');
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video.');
        }
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Profile Page</h1>
                <nav>
                    <Link to="/videos" className="nav-link">View All Videos</Link>
                </nav>
            </header>
            <div className="profile-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Display the profile picture in a circular shape */}
                {user.profilePic && (
                    <img
                        src={user.profilePic}
                        alt="Profile"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                )}
                <div>
                    <h2>Welcome, {user.firstName} {user.lastName}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <div>
                        <label>Upload Profile Picture:</label>
                        <input type="file" onChange={handleProfilePicUpload} />
                    </div>
                </div>
            </div>
            <div className="profile-actions">
                {/* Button to open video upload modal */}
                <button onClick={() => setShowUploadModal(true)}>Upload Video</button>

                {/* Video Upload Modal */}
                {showUploadModal && (
                    <div className="modal">
                        <h3>Upload Video</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={videoDescription}
                            onChange={(e) => setVideoDescription(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setSelectedVideo(e.target.files[0])}
                        />
                        <button onClick={handleVideoUpload}>Upload</button>
                        <button onClick={() => setShowUploadModal(false)}>Close</button>
                    </div>
                )}

                {/* Display uploaded videos */}
                {user.videos && user.videos.length > 0 && (
                    <div className="video-list">
                        {user.videos.map((video, index) => (
                            <div key={index} className="video-item">
                                <h4>{video.title}</h4>
                                <p>{video.description}</p>
                                <video controls width="320">
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
