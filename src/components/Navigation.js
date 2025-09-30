import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navigation = () => {
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    return (
        <nav className="border-b bg-card-50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center font-bold text-xl text-primary hover:text-primary-glow transition-colors nav-brand">
                        <GraduationCap className="h-6 w-6 mr-2" />
                        ProfLink
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/browse-faculty" 
                            className={`btn btn-ghost btn-sm ${
                                isActive('/browse-faculty') ? 'bg-accent' : ''
                            }`}
                        >
                            Browse Faculty
                        </Link>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;