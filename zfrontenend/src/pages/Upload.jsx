import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline, IoImageOutline } from 'react-icons/io5';

const Upload = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewThumb, setPreviewThumb] = useState(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewVideo(URL.createObjectURL(file));
        }
    };

    const handleThumbChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewThumb(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        try {
            setUploading(true);
            setError('');

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('videoFile', data.videoFile[0]);
            formData.append('thumbnail', data.thumbnail[0]);

            await api.post('/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

            {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm border border-red-500/20">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Video Upload Area */}
                <div className="relative border-2 border-dashed border-gray-700 bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors">
                    <input
                        type="file"
                        {...register("videoFile", { required: "Video is required" })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="video/*"
                        onChange={(e) => {
                            register("videoFile").onChange(e);
                            handleVideoChange(e);
                        }}
                    />
                    {previewVideo ? (
                        <video src={previewVideo} controls className="w-full h-64 object-contain bg-black" />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <IoCloudUploadOutline className="text-5xl text-blue-500 mb-2" />
                            <p className="font-medium text-lg">Select Video to Upload</p>
                            <p className="text-sm text-gray-500">MP4, WebM up to 100MB</p>
                            {errors.videoFile && <span className="text-red-500 text-xs mt-2">{errors.videoFile.message}</span>}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
                                placeholder="Video Title"
                            />
                            {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                rows={5}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500 resize-none"
                                placeholder="Tell viewers about your video"
                            />
                            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail</label>
                        <div className="relative border-2 border-dashed border-gray-700 bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors h-[218px]">
                            <input
                                type="file"
                                {...register("thumbnail", { required: "Thumbnail is required" })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                                onChange={(e) => {
                                    register("thumbnail").onChange(e);
                                    handleThumbChange(e);
                                }}
                            />
                            {previewThumb ? (
                                <img src={previewThumb} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <IoImageOutline className="text-4xl text-purple-500 mb-2" />
                                    <p className="font-medium">Upload Thumbnail</p>
                                    {errors.thumbnail && <span className="text-red-500 text-xs mt-2">{errors.thumbnail.message}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <IoCloudUploadOutline className="text-xl" />
                                Publish Video
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
