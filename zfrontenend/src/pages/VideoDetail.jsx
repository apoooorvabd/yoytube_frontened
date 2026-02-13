import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { IoThumbsUpOutline, IoShareSocialOutline } from "react-icons/io5";

const VideoDetail = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await api.get(`/videos/${id}`);
                setVideo(response.data.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load video');
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div></div>;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
    if (!video) return <div className="text-center py-20">Video not found</div>;

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-2xl shadow-blue-500/10">
                    <video
                        src={video.videoFile}
                        controls
                        autoPlay
                        className="w-full h-full"
                    />
                </div>

                <h1 className="text-xl md:text-2xl font-bold mt-4 mb-2">{video.title}</h1>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={video.owner?.avatar || "https://via.placeholder.com/40"}
                            alt={video.owner?.username}
                            className="w-10 h-10 rounded-full bg-gray-700"
                        />
                        <div>
                            <h3 className="font-semibold">{video.owner?.username}</h3>
                            <p className="text-xs text-gray-400">Subscribers (Mock)</p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors ml-4">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
                            <IoThumbsUpOutline className="text-lg" />
                            <span className="text-sm border-r border-gray-600 pr-3 mr-1">{video.likes || 0}</span>
                            <span className="text-sm">Like</span>
                        </button>
                        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
                            <IoShareSocialOutline className="text-lg" />
                            <span className="text-sm">Share</span>
                        </button>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer">
                    <div className="flex gap-2 text-sm font-medium mb-2">
                        <span>{video.views} views</span>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {video.description}
                    </p>
                </div>
            </div>

            <div className="lg:col-span-1">
                {/* Related Videos recommendation - can be static or mock for now */}
                <h3 className="font-semibold mb-4">Up Next</h3>
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 italic">Recommendations coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;
