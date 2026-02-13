import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
    // Format duration to mm:ss
    const formatDuration = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = pad(date.getUTCSeconds());
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const pad = (string) => {
        return ('0' + string).slice(-2);
    };

    return (
        <Link to={`/video/${video._id}`} className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                </div>
            </div>

            <div className="flex gap-3 mt-3">
                <div className="flex-shrink-0">
                    <img
                        src={video.ownerDetails?.avatar || video.owner?.avatar || "https://via.placeholder.com/40"} // owner might be populated or an ID depending on backend aggregation
                        alt="Channel"
                        className="w-9 h-9 rounded-full object-cover border border-gray-800"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-white font-semibold line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                        {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 hover:text-white transition-colors">
                        {video.ownerDetails?.username || video.owner?.username}
                    </p>
                    <div className="text-gray-500 text-xs flex items-center gap-1">
                        <span>{video.views} views</span>
                        <span>•</span>
                        {/* <span>{timeAgo(video.createdAt)}</span> */} {/* Need a timeAgo helper later */}
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
