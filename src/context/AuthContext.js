import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock users for demonstration
    const mockUsers = {
        student: {
            id: 'user_1',
            name: 'John Doe',
            email: 'john.doe@university.edu',
            type: 'student',
            studentId: 'STU2023001',
            year: 'Senior',
            major: 'Computer Science',
            avatar: null,
            createdAt: '2023-01-15'
        },
        faculty: {
            id: 'user_2',
            name: 'Dr. Sarah Wilson',
            email: 'sarah.wilson@university.edu',
            type: 'faculty',
            employeeId: 'FAC2020001',
            department: 'Computer Science',
            title: 'Professor',
            office: 'Room 301',
            phone: '+1-555-0123',
            avatar: null,
            createdAt: '2020-08-20'
        }
    };

    // Initialize auth state on component mount
    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const savedUser = localStorage.getItem('proflink_user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('proflink_user');
            }
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password, userType = 'student') => {
        setLoading(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simple validation - in real app, this would be an API call
            if (email && password) {
                const userData = mockUsers[userType];
                setUser(userData);
                
                // Save to localStorage for persistence
                localStorage.setItem('proflink_user', JSON.stringify(userData));
                
                setLoading(false);
                return { success: true, user: userData };
            } else {
                setLoading(false);
                return { success: false, error: 'Invalid credentials' };
            }
        } catch (error) {
            setLoading(false);
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('proflink_user');
    };

    // Update user profile
    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('proflink_user', JSON.stringify(updatedUser));
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return user !== null;
    };

    // Check if user is student
    const isStudent = () => {
        return user?.type === 'student';
    };

    // Check if user is faculty
    const isFaculty = () => {
        return user?.type === 'faculty';
    };

    // Get user's display name
    const getUserDisplayName = () => {
        if (!user) return 'Guest';
        return user.name || user.email || 'User';
    };

    // Auth context value
    const value = {
        // State
        user,
        loading,
        
        // Actions
        login,
        logout,
        updateProfile,
        
        // Helpers
        isAuthenticated,
        isStudent,
        isFaculty,
        getUserDisplayName
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;