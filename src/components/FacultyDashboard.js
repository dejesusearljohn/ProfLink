import React, { useState } from 'react';
import { CalendarPlus } from 'lucide-react';

const FacultyDashboard = () => {
    const [stats] = useState({
        today: 2,
        thisWeek: 12,
        pending: 4,
        rating: 4.8
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
                <button className="btn btn-primary">
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Set Availability
                </button>
            </div>
            
            {/* Faculty Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Today's Appointments</h3>
                    <p className="text-2xl font-bold text-primary">{stats.today}</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
                    <p className="text-2xl font-bold text-primary">{stats.thisWeek}</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Pending Requests</h3>
                    <p className="text-2xl font-bold text-orange">{stats.pending}</p>
                </div>
                <div className="card p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
                    <p className="text-2xl font-bold text-primary">{stats.rating}</p>
                </div>
            </div>
            
            {/* Faculty Schedule */}
            <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                            <h3 className="font-medium">Meeting with John Doe</h3>
                            <p className="text-sm text-muted-foreground">Computer Science Research Discussion</p>
                            <p className="text-sm text-muted-foreground">10:00 AM - 10:45 AM</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-secondary btn-sm">View Details</button>
                            <button className="btn btn-primary btn-sm">Start Meeting</button>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                            <h3 className="font-medium">Meeting with Sarah Smith</h3>
                            <p className="text-sm text-muted-foreground">Thesis Guidance Session</p>
                            <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-secondary btn-sm">View Details</button>
                            <button className="btn btn-ghost btn-sm">Scheduled</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;