import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideosListing.css'; // Create CSS file for styling

function VideoListing() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/user/videos');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="video-listing-container">
            <h2>Video Listings</h2>
            <div className="video-list">
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div key={index} className="video-item">
                            <div className="user-info">
                                <img
                                    src={video.user.profilePic}
                                    alt={`${video.user.firstName} ${video.user.lastName}`}
                                    className="profile-pic"
                                />
                                <div className="user-details">
                                    <h3>{video.user.firstName} {video.user.lastName}</h3>
                                </div>
                            </div>
                            <div className="video-content">
                                <h4>{video.title}</h4>
                                <p>{video.description}</p>
                                <video controls width="320">
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No videos available</p>
                )}
            </div>
        </div>
    );
}

export default VideoListing;
