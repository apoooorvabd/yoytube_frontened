import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/users/me');
                setUser(response.data.data);
            } catch (error) {
                console.log("Not authenticated", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (data) => {
        const response = await api.post('/users/login', data);
        setUser(response.data.data.user);
        return response.data;
    };

    const register = async (formData) => {
        const response = await api.post('/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // Optionally login after register or redirect to login
        return response.data;
    };

    const logout = async () => {
        await api.post('/users/logout');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
