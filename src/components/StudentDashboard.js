import React, { useState, useEffect } from 'react';
import { Plus, CalendarPlus } from 'lucide-react';
import { useMockData } from '../data/MockDataService';

const StudentDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        upcoming: 0,
        thisMonth: 0,
        total: 0
    });
    
    const dataService = useMockData();

    useEffect(() => {
        loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const response = await dataService.getAppointments('user_1');
            if (response.success) {
                setAppointments(response.data);
                
                // Calculate stats
                const upcoming = response.data.filter(apt => apt.status === 'upcoming').length;
                const thisMonth = response.data.filter(apt => {
                    const aptDate = new Date(apt.date);
                    const now = new Date();
                    return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear();
                }).length;
                
                setStats({
                    upcoming,
                    thisMonth,
                    total: response.data.length
                });
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hour), parseInt(minute));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            upcoming: 'badge-primary',
            completed: 'badge-success',
            pending: 'badge-warning',
            cancelled: 'badge-secondary'
        };
        
        return (
            <span className={`badge ${statusClasses[status] || 'badge-secondary'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <button className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                </button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Upcoming Appointments</h3>
                    <p className="text-2xl font-bold text-primary">{stats.upcoming}</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">This Month</h3>
                    <p className="text-2xl font-bold text-primary">{stats.thisMonth}</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Consultations</h3>
                    <p className="text-2xl font-bold text-primary">{stats.total}</p>
                </div>
            </div>
            
            {/* Appointments List */}
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <div className="card p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                            <CalendarPlus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Appointments Yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Get started by booking your first consultation with a faculty member.
                        </p>
                        <button className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Book Your First Appointment
                        </button>
                    </div>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className="card p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{appointment.facultyName}</h3>
                                        {getStatusBadge(appointment.status)}
                                    </div>
                                    <p className="text-muted-foreground mb-1">{appointment.facultyTitle}</p>
                                    <p className="text-muted-foreground mb-2">{appointment.facultyDepartment}</p>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Date:</span> {formatDate(appointment.date)}</p>
                                        <p><span className="font-medium">Time:</span> {formatTime(appointment.time)}</p>
                                        <p><span className="font-medium">Duration:</span> {appointment.duration} minutes</p>
                                        <p><span className="font-medium">Purpose:</span> {appointment.purpose}</p>
                                        {appointment.location && (
                                            <p><span className="font-medium">Location:</span> {appointment.location}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {appointment.status === 'upcoming' && (
                                        <>
                                            <button className="btn btn-secondary btn-sm">
                                                Reschedule
                                            </button>
                                            <button className="btn btn-ghost btn-sm text-destructive">
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {appointment.status === 'completed' && (
                                        <button className="btn btn-secondary btn-sm">
                                            Rate & Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;