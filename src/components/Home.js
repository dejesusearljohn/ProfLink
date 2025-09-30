import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, ArrowRight, Calendar, MessageSquare, Clock } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-1">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-12">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        Connect Students with Faculty
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Streamline academic consultations with our simple booking platform. 
                        Browse faculty, book appointments, and manage your academic meetings all in one place.
                    </p>
                </div>
                
                <div className="relative max-w-4xl mx-auto">
                    <img 
                        src="/hero-consultation.jpg" 
                        alt="Students and faculty in consultation"
                        className="rounded-2xl shadow-elegant w-full h-300 md:h-400 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-overlay rounded-2xl"></div>
                </div>
            </section>

            {/* Call to Action Buttons - Positioned between hero and features */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                    to="/login" 
                    className="btn btn-primary btn-lg"
                >
                    <User className="h-5 w-5 mr-2" />
                    Proceed to Login
                    <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
            </div>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 py-12">
                <div className="card text-center p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                        <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
                    <p className="text-muted-foreground">
                        Book appointments with your preferred faculty members in just a few clicks.
                    </p>
                </div>
                
                <div className="card text-center p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Real-time Communication</h3>
                    <p className="text-muted-foreground">
                        Stay connected with faculty through integrated messaging and notifications.
                    </p>
                </div>
                
                <div className="card text-center p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                        <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Time Management</h3>
                    <p className="text-muted-foreground">
                        Efficiently manage your consultation schedule with automated reminders.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;