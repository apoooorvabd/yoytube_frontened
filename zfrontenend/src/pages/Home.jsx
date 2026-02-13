import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import VideoCard from '../components/VideoCard';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Assuming the backend returns paginated data structure or list
                const response = await api.get('/videos');
                // Adjust based on actual API response structure (e.g. response.data.data.docs or response.data.data)
                console.log("Videos response:", response.data);
                setVideos(response.data.data.docs || response.data.data);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError('Failed to load videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
            {videos.length === 0 && (
                <div className="text-center text-gray-400 py-20">
                    No videos found
                </div>
            )}
        </div>
    );
};

export default Home;
