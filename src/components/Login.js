import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Users, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'student'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const result = await login(formData.email, formData.password, formData.userType);
            
            if (result.success) {
                // Redirect based on user type
                if (formData.userType === 'student') {
                    navigate('/student-dashboard');
                } else {
                    navigate('/faculty-dashboard');
                }
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        }
    };

    const handleDemoLogin = (userType) => {
        setFormData({
            email: userType === 'student' ? 'john.doe@university.edu' : 'sarah.wilson@university.edu',
            password: 'demo123',
            userType
        });
    };

    return (
        <div className="bg-facebook-bg">
            <div className="facebook-container">
                {/* Left Column - Branding */}
                <div className="facebook-branding">
                    <div className="facebook-brand-content">
                        <h1 className="facebook-title">ProfLink</h1>
                        <p className="facebook-tagline">
                            Connect with professors and students. <br />
                            Manage your consultations seamlessly.
                        </p>
                    </div>
                </div>

                {/* Right Column - Login Form */}
                <div className="facebook-form-section">
                    <div className="facebook-form-container">
                        {/* Error Display */}
                        {error && (
                            <div className="facebook-error">
                                {error}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="facebook-form">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className="facebook-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            <div className="facebook-password-container">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="facebook-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="facebook-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* User Type Selection */}
                            <div className="facebook-user-type">
                                <label className={`facebook-user-option ${formData.userType === 'student' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="student"
                                        checked={formData.userType === 'student'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <User className="h-4 w-4" />
                                    Student
                                </label>
                                <label className={`facebook-user-option ${formData.userType === 'faculty' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="faculty"
                                        checked={formData.userType === 'faculty'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <Users className="h-4 w-4" />
                                    Faculty
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="facebook-login-btn"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Logging in...
                                    </div>
                                ) : (
                                    'Log In'
                                )}
                            </button>

                            <Link to="/forgot-password" className="facebook-forgot-link">
                                Forgotten password?
                            </Link>
                        </form>

                        <div className="facebook-divider"></div>

                        {/* Create Account Button */}
                        <Link to="/register" className="facebook-create-btn">
                            Create New Account
                        </Link>

                        {/* Demo Access */}
                        <div className="facebook-demo-section">
                            <p className="facebook-demo-text">Quick Demo Access:</p>
                            <div className="facebook-demo-buttons">
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('student')}
                                    className="facebook-demo-btn"
                                >
                                    <User className="h-4 w-4" />
                                    Student Demo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('faculty')}
                                    className="facebook-demo-btn"
                                >
                                    <Users className="h-4 w-4" />
                                    Faculty Demo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="facebook-footer">
                        <p className="facebook-create-page">
                            I agree to the <strong>Terms & Conditions</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;