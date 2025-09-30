// ProfLink - Mock Data and API Simulation
// Simulates backend data and API calls for the vanilla version

class MockDataService {
    constructor() {
        this.users = this.generateUsers();
        this.faculty = this.generateFaculty();
        this.appointments = this.generateAppointments();
        this.departments = this.generateDepartments();
        
        // Simulate API delay
        this.apiDelay = 500;
    }

    // Simulate async API calls
    async delay(ms = this.apiDelay) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // User Management
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
            },
            {
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
        ];
    }

    // Faculty Data
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
            },
            {
                id: 'fac_4',
                name: 'Dr. James Thompson',
                title: 'Professor of Chemistry',
                department: 'Chemistry',
                email: 'james.thompson@university.edu',
                phone: '+1-555-0126',
                office: 'Room 150, Chemistry Building',
                rating: 4.6,
                totalReviews: 143,
                availability: {
                    monday: { start: '08:00', end: '16:00', available: true },
                    tuesday: { start: '08:00', end: '16:00', available: true },
                    wednesday: { start: '08:00', end: '16:00', available: true },
                    thursday: { start: '08:00', end: '16:00', available: true },
                    friday: { start: '08:00', end: '12:00', available: true },
                    saturday: { available: false },
                    sunday: { available: false }
                },
                expertise: ['Organic Chemistry', 'Biochemistry', 'Lab Safety', 'Chemical Analysis'],
                bio: 'Dr. Thompson has extensive experience in organic chemistry and has published numerous papers on biochemical processes.',
                education: ['Ph.D. Chemistry - Yale', 'M.S. Chemistry - Northwestern'],
                publications: 67,
                consultationDuration: 45,
                status: 'active',
                languages: ['English']
            },
            {
                id: 'fac_5',
                name: 'Dr. Lisa Park',
                title: 'Associate Professor of Biology',
                department: 'Biology',
                email: 'lisa.park@university.edu',
                phone: '+1-555-0127',
                office: 'Room 220, Biology Building',
                rating: 4.9,
                totalReviews: 78,
                availability: {
                    monday: { start: '09:00', end: '17:00', available: true },
                    tuesday: { available: false },
                    wednesday: { start: '09:00', end: '17:00', available: true },
                    thursday: { start: '09:00', end: '17:00', available: true },
                    friday: { start: '09:00', end: '17:00', available: true },
                    saturday: { available: false },
                    sunday: { available: false }
                },
                expertise: ['Molecular Biology', 'Genetics', 'Cell Biology', 'Research Design'],
                bio: 'Dr. Park is a molecular biologist with expertise in genetic research and cell biology applications.',
                education: ['Ph.D. Biology - Johns Hopkins', 'M.S. Molecular Biology - UCSF'],
                publications: 41,
                consultationDuration: 45,
                status: 'active',
                languages: ['English', 'Korean']
            }
        ];
    }

    // Appointments Data
    generateAppointments() {
        const now = new Date();
        const appointments = [];

        // Generate some past appointments
        for (let i = 0; i < 5; i++) {
            const pastDate = new Date(now);
            pastDate.setDate(now.getDate() - Math.floor(Math.random() * 30) - 1);
            
            appointments.push({
                id: `apt_past_${i}`,
                studentId: 'user_1',
                facultyId: this.faculty[Math.floor(Math.random() * this.faculty.length)].id,
                date: pastDate.toISOString().split('T')[0],
                time: ['09:00', '10:00', '14:00', '15:00', '16:00'][Math.floor(Math.random() * 5)],
                duration: 45,
                status: 'completed',
                purpose: 'Previous consultation discussion',
                location: 'Faculty Office',
                notes: 'Completed successfully',
                createdAt: pastDate.toISOString(),
                rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
            });
        }

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

        // Generate some pending appointments (for faculty view)
        for (let i = 0; i < 2; i++) {
            const pendingDate = new Date(now);
            pendingDate.setDate(now.getDate() + Math.floor(Math.random() * 7) + 1);
            
            appointments.push({
                id: `apt_pending_${i}`,
                studentId: 'user_1',
                facultyId: 'fac_1', // Dr. Wilson
                date: pendingDate.toISOString().split('T')[0],
                time: ['09:00', '10:00', '14:00', '15:00'][Math.floor(Math.random() * 4)],
                duration: 45,
                status: 'pending',
                purpose: 'Need approval for consultation',
                location: 'To be determined',
                notes: '',
                createdAt: now.toISOString()
            });
        }

        return appointments;
    }

    // Departments Data
    generateDepartments() {
        return [
            {
                id: 'dept_cs',
                name: 'Computer Science',
                code: 'CS',
                description: 'Department of Computer Science and Engineering',
                building: 'Computer Science Building',
                phone: '+1-555-0100',
                email: 'cs@university.edu',
                head: 'Dr. Sarah Wilson',
                facultyCount: 25,
                established: '1985'
            },
            {
                id: 'dept_math',
                name: 'Mathematics',
                code: 'MATH',
                description: 'Department of Mathematics and Statistics',
                building: 'Mathematics Building',
                phone: '+1-555-0101',
                email: 'math@university.edu',
                head: 'Dr. Michael Chen',
                facultyCount: 18,
                established: '1970'
            },
            {
                id: 'dept_physics',
                name: 'Physics',
                code: 'PHYS',
                description: 'Department of Physics and Astronomy',
                building: 'Physics Building',
                phone: '+1-555-0102',
                email: 'physics@university.edu',
                head: 'Dr. Emily Rodriguez',
                facultyCount: 15,
                established: '1965'
            },
            {
                id: 'dept_chem',
                name: 'Chemistry',
                code: 'CHEM',
                description: 'Department of Chemistry and Biochemistry',
                building: 'Chemistry Building',
                phone: '+1-555-0103',
                email: 'chemistry@university.edu',
                head: 'Dr. James Thompson',
                facultyCount: 20,
                established: '1960'
            },
            {
                id: 'dept_bio',
                name: 'Biology',
                code: 'BIO',
                description: 'Department of Biological Sciences',
                building: 'Biology Building',
                phone: '+1-555-0104',
                email: 'biology@university.edu',
                head: 'Dr. Lisa Park',
                facultyCount: 22,
                established: '1958'
            }
        ];
    }

    // API Simulation Methods
    async getFaculty(filters = {}) {
        await this.delay();
        
        let result = [...this.faculty];
        
        // Apply filters
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
        
        if (filters.availability) {
            // Filter by availability (simplified)
            result = result.filter(f => f.status === 'active');
        }
        
        return {
            success: true,
            data: result,
            total: result.length
        };
    }

    async getFacultyById(id) {
        await this.delay();
        
        const faculty = this.faculty.find(f => f.id === id);
        
        if (faculty) {
            return {
                success: true,
                data: faculty
            };
        } else {
            return {
                success: false,
                error: 'Faculty member not found'
            };
        }
    }

    async getAppointments(userId, filters = {}) {
        await this.delay();
        
        let result = this.appointments.filter(apt => 
            apt.studentId === userId || apt.facultyId === userId
        );
        
        // Apply filters
        if (filters.status) {
            result = result.filter(apt => apt.status === filters.status);
        }
        
        if (filters.dateFrom) {
            result = result.filter(apt => apt.date >= filters.dateFrom);
        }
        
        if (filters.dateTo) {
            result = result.filter(apt => apt.date <= filters.dateTo);
        }
        
        // Add faculty/student information
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
        
        // Validate required fields
        const required = ['studentId', 'facultyId', 'date', 'time', 'purpose'];
        for (const field of required) {
            if (!appointmentData[field]) {
                return {
                    success: false,
                    error: `${field} is required`
                };
            }
        }
        
        // Check if faculty exists
        const faculty = this.faculty.find(f => f.id === appointmentData.facultyId);
        if (!faculty) {
            return {
                success: false,
                error: 'Faculty member not found'
            };
        }
        
        // Check availability (simplified)
        const dayOfWeek = new Date(appointmentData.date).toLocaleDateString('en-US', { weekday: 'lowercase' });
        const facultyAvailability = faculty.availability[dayOfWeek];
        
        if (!facultyAvailability || !facultyAvailability.available) {
            return {
                success: false,
                error: 'Faculty is not available on this day'
            };
        }
        
        // Create new appointment
        const newAppointment = {
            id: `apt_${Date.now()}`,
            ...appointmentData,
            status: 'pending',
            duration: faculty.consultationDuration,
            location: faculty.office,
            createdAt: new Date().toISOString(),
            remindersEnabled: true
        };
        
        this.appointments.push(newAppointment);
        
        return {
            success: true,
            data: newAppointment
        };
    }

    async updateAppointment(id, updates) {
        await this.delay();
        
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === id);
        
        if (appointmentIndex === -1) {
            return {
                success: false,
                error: 'Appointment not found'
            };
        }
        
        this.appointments[appointmentIndex] = {
            ...this.appointments[appointmentIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        return {
            success: true,
            data: this.appointments[appointmentIndex]
        };
    }

    async deleteAppointment(id) {
        await this.delay();
        
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === id);
        
        if (appointmentIndex === -1) {
            return {
                success: false,
                error: 'Appointment not found'
            };
        }
        
        this.appointments.splice(appointmentIndex, 1);
        
        return {
            success: true,
            message: 'Appointment cancelled successfully'
        };
    }

    async getDepartments() {
        await this.delay();
        
        return {
            success: true,
            data: this.departments,
            total: this.departments.length
        };
    }

    async getAvailableSlots(facultyId, date) {
        await this.delay();
        
        const faculty = this.faculty.find(f => f.id === facultyId);
        if (!faculty) {
            return {
                success: false,
                error: 'Faculty member not found'
            };
        }
        
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
        const availability = faculty.availability[dayOfWeek];
        
        if (!availability || !availability.available) {
            return {
                success: true,
                data: [],
                message: 'No availability on this day'
            };
        }
        
        // Generate available slots (simplified)
        const slots = [];
        const startHour = parseInt(availability.start.split(':')[0]);
        const endHour = parseInt(availability.end.split(':')[0]);
        const duration = faculty.consultationDuration;
        
        for (let hour = startHour; hour < endHour; hour++) {
            // Check if slot is already booked
            const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
            const isBooked = this.appointments.some(apt => 
                apt.facultyId === facultyId && 
                apt.date === date && 
                apt.time === timeSlot &&
                apt.status !== 'cancelled'
            );
            
            if (!isBooked) {
                slots.push({
                    time: timeSlot,
                    available: true,
                    duration: duration
                });
            }
        }
        
        return {
            success: true,
            data: slots
        };
    }
}

// Create global instance
window.mockDataService = new MockDataService();