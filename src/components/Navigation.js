import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, LogOut, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const location = useLocation();
    const { isAuthenticated, isStudent, isFaculty, getUserDisplayName, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    const NavLinks = () => (
        <div className="nav-links flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <Link to="/browse-faculty" className={`btn btn-ghost btn-sm ${isActive('/browse-faculty') ? 'bg-accent' : ''}`}>
                Browse Faculty
            </Link>
            <Link to="/counter" className={`btn btn-ghost btn-sm ${isActive('/counter') ? 'bg-accent' : ''}`}>
                Counter Demo
            </Link>

            {isAuthenticated() ? (
                <>
                    {isStudent() && (
                        <Link to="/student-dashboard" className={`btn btn-ghost btn-sm ${isActive('/student-dashboard') ? 'bg-accent' : ''}`}>
                            My Dashboard
                        </Link>
                    )}
                    {isFaculty() && (
                        <Link to="/faculty-dashboard" className={`btn btn-ghost btn-sm ${isActive('/faculty-dashboard') ? 'bg-accent' : ''}`}>
                            Faculty Portal
                        </Link>
                    )}

                    <div className="flex items-center gap-2 ml-0 sm:ml-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-light">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{getUserDisplayName()}</span>
                        </div>
                        <button onClick={handleLogout} className="btn btn-ghost btn-sm" title="Logout">
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/student-dashboard" className={`btn btn-ghost btn-sm ${isActive('/student-dashboard') ? 'bg-accent' : ''}`}>
                        Student Portal
                    </Link>
                    <Link to="/faculty-dashboard" className={`btn btn-ghost btn-sm ${isActive('/faculty-dashboard') ? 'bg-accent' : ''}`}>
                        Faculty Portal
                    </Link>
                    <Link to="/login" className={`btn btn-primary btn-sm ${isActive('/login') ? 'bg-accent' : ''}`}>
                        Login
                    </Link>
                </>
            )}
        </div>
    );

    return (
        <nav className="border-b bg-card-50 backdrop-blur-sm sticky top-0 z-50" role="navigation">
            <div className="container mx-auto px-4 py-3 nav-container">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center font-bold text-xl text-primary hover:text-primary-glow transition-colors nav-brand">
                        <GraduationCap className="h-6 w-6 mr-2" />
                        ProfLink
                    </Link>

                    {/* Desktop links */}
                    <div className="desktop-links hidden sm:flex sm:items-center">
                        <NavLinks />
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="nav-toggle sm:hidden ml-2 p-2"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        type="button"
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`mobile-menu sm:hidden mt-3 ${menuOpen ? 'block' : 'hidden'}`}>
                    <NavLinks />
                </div>
            </div>
        </nav>
    );
};

export default Navigation;