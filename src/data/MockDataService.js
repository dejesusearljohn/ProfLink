import React, { createContext, useContext, useState } from 'react';

// Mock Data Service - React Version
class MockDataService {
    constructor() {
        this.users = this.generateUsers();
        this.faculty = this.generateFaculty();
        this.appointments = this.generateAppointments();
        this.departments = this.generateDepartments();
        this.apiDelay = 500;
    }

    async delay(ms = this.apiDelay) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateUsers() {
        return [
            {
                id: 'user_1',
                name: 'John Doe',
                email: 'john.doe@university.edu',
                type: 'student',
                studentId: 'STU2023001',
                year: 'Senior',
                major: 'Computer Science',
                avatar: null,
                createdAt: '2023-01-15'
            }
        ];
    }

    generateFaculty() {
        return [
            {
                id: 'fac_1',
                name: 'Dr. Sarah Wilson',
                title: 'Professor of Computer Science',
                department: 'Computer Science',
                email: 'sarah.wilson@university.edu',
                phone: '+1-555-0123',
                office: 'Room 301, CS Building',
                rating: 4.9,
                totalReviews: 127,
                availability: {
                    monday: { start: '09:00', end: '17:00', available: true },
                    tuesday: { start: '09:00', end: '17:00', available: true },
                    wednesday: { start: '09:00', end: '17:00', available: true },
                    thursday: { start: '09:00', end: '17:00', available: true },
                    friday: { start: '09:00', end: '15:00', available: true },
                    saturday: { available: false },
                    sunday: { available: false }
                },
                expertise: ['Machine Learning', 'Artificial Intelligence', 'Data Science', 'Research Methods'],
                bio: 'Dr. Wilson is a leading researcher in machine learning with over 15 years of experience in both academia and industry.',
                education: ['Ph.D. Computer Science - MIT', 'M.S. Computer Science - Stanford'],
                publications: 45,
                consultationDuration: 45,
                status: 'active',
                languages: ['English', 'Spanish']
            },
            {
                id: 'fac_2', 
                name: 'Dr. Michael Chen',
                title: 'Associate Professor of Mathematics',
                department: 'Mathematics',
                email: 'michael.chen@university.edu',
                phone: '+1-555-0124',
                office: 'Room 205, Math Building',
                rating: 4.7,
                totalReviews: 89,
                availability: {
                    monday: { available: false },
                    tuesday: { start: '10:00', end: '16:00', available: true },
                    wednesday: { start: '10:00', end: '16:00', available: true },
                    thursday: { start: '10:00', end: '16:00', available: true },
                    friday: { start: '10:00', end: '16:00', available: true },
                    saturday: { available: false },
                    sunday: { available: false }
                },
                expertise: ['Statistics', 'Data Analysis', 'Calculus', 'Probability Theory'],
                bio: 'Dr. Chen specializes in applied mathematics and statistical modeling with applications in data science.',
                education: ['Ph.D. Mathematics - UC Berkeley', 'M.S. Applied Math - Caltech'],
                publications: 32,
                consultationDuration: 30,
                status: 'active',
                languages: ['English', 'Mandarin']
            },
            {
                id: 'fac_3',
                name: 'Dr. Emily Rodriguez',
                title: 'Assistant Professor of Physics',
                department: 'Physics',
                email: 'emily.rodriguez@university.edu',
                phone: '+1-555-0125',
                office: 'Room 402, Physics Building',
                rating: 4.8,
                totalReviews: 56,
                availability: {
                    monday: { start: '13:00', end: '18:00', available: true },
                    tuesday: { start: '13:00', end: '18:00', available: true },
                    wednesday: { start: '13:00', end: '18:00', available: true },
                    thursday: { available: false },
                    friday: { available: false },
                    saturday: { available: false },
                    sunday: { available: false }
                },
                expertise: ['Quantum Physics', 'Research Methodology', 'Laboratory Techniques', 'Theoretical Physics'],
                bio: 'Dr. Rodriguez is an expert in quantum physics and leads several cutting-edge research projects.',
                education: ['Ph.D. Physics - Harvard', 'M.S. Physics - Princeton'],
                publications: 28,
                consultationDuration: 60,
                status: 'active',
                languages: ['English', 'Spanish', 'Portuguese']
            }
        ];
    }

    generateAppointments() {
        const now = new Date();
        const appointments = [];

        // Generate some future appointments
        for (let i = 0; i < 3; i++) {
            const futureDate = new Date(now);
            futureDate.setDate(now.getDate() + Math.floor(Math.random() * 14) + 1);
            
            appointments.push({
                id: `apt_future_${i}`,
                studentId: 'user_1',
                facultyId: this.faculty[Math.floor(Math.random() * this.faculty.length)].id,
                date: futureDate.toISOString().split('T')[0],
                time: ['09:00', '10:00', '14:00', '15:00', '16:00'][Math.floor(Math.random() * 5)],
                duration: 45,
                status: 'upcoming',
                purpose: 'Upcoming consultation',
                location: 'Faculty Office',
                notes: '',
                createdAt: now.toISOString(),
                remindersEnabled: true
            });
        }

        return appointments;
    }

    generateDepartments() {
        return [
            { id: 'dept_cs', name: 'Computer Science', code: 'CS' },
            { id: 'dept_math', name: 'Mathematics', code: 'MATH' },
            { id: 'dept_physics', name: 'Physics', code: 'PHYS' },
            { id: 'dept_chem', name: 'Chemistry', code: 'CHEM' },
            { id: 'dept_bio', name: 'Biology', code: 'BIO' }
        ];
    }

    async getFaculty(filters = {}) {
        await this.delay();
        
        let result = [...this.faculty];
        
        if (filters.department) {
            result = result.filter(f => f.department.toLowerCase().includes(filters.department.toLowerCase()));
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(f => 
                f.name.toLowerCase().includes(searchLower) ||
                f.department.toLowerCase().includes(searchLower) ||
                f.expertise.some(e => e.toLowerCase().includes(searchLower))
            );
        }
        
        return {
            success: true,
            data: result,
            total: result.length
        };
    }

    async getAppointments(userId, filters = {}) {
        await this.delay();
        
        let result = this.appointments.filter(apt => 
            apt.studentId === userId || apt.facultyId === userId
        );
        
        if (filters.status) {
            result = result.filter(apt => apt.status === filters.status);
        }
        
        result = result.map(apt => {
            const faculty = this.faculty.find(f => f.id === apt.facultyId);
            return {
                ...apt,
                facultyName: faculty?.name || 'Unknown Faculty',
                facultyTitle: faculty?.title || '',
                facultyDepartment: faculty?.department || ''
            };
        });
        
        return {
            success: true,
            data: result,
            total: result.length
        };
    }

    async createAppointment(appointmentData) {
        await this.delay();
        
        const newAppointment = {
            id: `apt_${Date.now()}`,
            ...appointmentData,
            status: 'pending',
            duration: 45,
            createdAt: new Date().toISOString(),
            remindersEnabled: true
        };
        
        this.appointments.push(newAppointment);
        
        return {
            success: true,
            data: newAppointment
        };
    }
}

// Create context
const MockDataContext = createContext();

// Provider component
export const MockDataProvider = ({ children }) => {
    const [dataService] = useState(() => new MockDataService());
    
    return (
        <MockDataContext.Provider value={dataService}>
            {children}
        </MockDataContext.Provider>
    );
};

// Custom hook to use the data service
export const useMockData = () => {
    const context = useContext(MockDataContext);
    if (!context) {
        throw new Error('useMockData must be used within a MockDataProvider');
    }
    return context;
};

export default MockDataService;