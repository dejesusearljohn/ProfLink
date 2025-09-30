import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const location = useLocation();
    const { user, isAuthenticated, isStudent, isFaculty, getUserDisplayName, logout } = useAuth();
    
    const isActive = (path) => location.pathname === path;
    
    const handleLogout = () => {
        logout();
        // Optionally redirect to home page
        window.location.href = '/';
    };
    
    return (
        <nav className="border-b bg-card-50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center font-bold text-xl text-primary hover:text-primary-glow transition-colors nav-brand">
                        <GraduationCap className="h-6 w-6 mr-2" />
                        ProfLink
                    </Link>
                    
                    <div className="flex items-center gap-2">
                        {/* Always show Browse Faculty */}
                        <Link 
                            to="/browse-faculty" 
                            className={`btn btn-ghost btn-sm ${
                                isActive('/browse-faculty') ? 'bg-accent' : ''
                            }`}
                        >
                            Browse Faculty
                        </Link>
                        
                        {/* Counter Demo */}
                        <Link 
                            to="/counter" 
                            className={`btn btn-ghost btn-sm ${
                                isActive('/counter') ? 'bg-accent' : ''
                            }`}
                        >
                            Counter Demo
                        </Link>
                        
                        {/* Show different navigation based on authentication and user type */}
                        {isAuthenticated() ? (
                            <>
                                {/* Student-specific navigation */}
                                {isStudent() && (
                                    <Link 
                                        to="/student-dashboard" 
                                        className={`btn btn-ghost btn-sm ${
                                            isActive('/student-dashboard') ? 'bg-accent' : ''
                                        }`}
                                    >
                                        My Dashboard
                                    </Link>
                                )}
                                
                                {/* Faculty-specific navigation */}
                                {isFaculty() && (
                                    <Link 
                                        to="/faculty-dashboard" 
                                        className={`btn btn-ghost btn-sm ${
                                            isActive('/faculty-dashboard') ? 'bg-accent' : ''
                                        }`}
                                    >
                                        Faculty Portal
                                    </Link>
                                )}
                                
                                {/* User profile dropdown */}
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-light">
                                        <User className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium text-primary">
                                            {getUserDisplayName()}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="btn btn-ghost btn-sm"
                                        title="Logout"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Non-authenticated navigation */}
                                <Link 
                                    to="/student-dashboard" 
                                    className={`btn btn-ghost btn-sm ${
                                        isActive('/student-dashboard') ? 'bg-accent' : ''
                                    }`}
                                >
                                    Student Portal
                                </Link>
                                <Link 
                                    to="/faculty-dashboard" 
                                    className={`btn btn-ghost btn-sm ${
                                        isActive('/faculty-dashboard') ? 'bg-accent' : ''
                                    }`}
                                >
                                    Faculty Portal
                                </Link>
                                <Link 
                                    to="/login" 
                                    className={`btn btn-primary btn-sm ${
                                        isActive('/login') ? 'bg-accent' : ''
                                    }`}
                                >
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;