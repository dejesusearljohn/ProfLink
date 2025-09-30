// ProfLink - Main Application Logic
// Converted from React components to vanilla JavaScript

class ProfLinkApp {
    constructor() {
        this.currentView = 'home';
        this.appointments = [];
        this.faculty = [];
        this.currentUser = { type: 'student', name: 'John Doe' }; // Mock user
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMockData();
        this.showView('home');
        
        // Initialize toast system
        this.toastContainer = document.getElementById('toast-container');
        
        // Initialize modal system
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalContent = document.getElementById('modal-content');
        
        // Close modal on overlay click
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('home-btn').addEventListener('click', () => this.showView('home'));
        document.getElementById('browse-faculty-btn').addEventListener('click', () => this.showView('browse-faculty'));
        document.getElementById('student-portal-btn').addEventListener('click', () => this.showView('student-dashboard'));
        document.getElementById('faculty-portal-btn').addEventListener('click', () => this.showView('faculty-dashboard'));
        
        // CTA buttons on home page
        document.getElementById('cta-student-btn').addEventListener('click', () => this.showView('student-dashboard'));
        document.getElementById('cta-faculty-btn').addEventListener('click', () => this.showView('faculty-dashboard'));
        
        // Dashboard buttons
        document.getElementById('book-appointment-btn').addEventListener('click', () => this.openBookingModal());
        document.getElementById('set-availability-btn').addEventListener('click', () => this.openAvailabilityModal());
        
        // Search and filter
        document.getElementById('faculty-search').addEventListener('input', (e) => this.filterFaculty(e.target.value));
        document.getElementById('department-filter').addEventListener('change', (e) => this.filterByDepartment(e.target.value));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        
        // Show selected view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            
            // Update data for specific views
            if (viewName === 'student-dashboard') {
                this.renderStudentDashboard();
            } else if (viewName === 'faculty-dashboard') {
                this.renderFacultyDashboard();
            } else if (viewName === 'browse-faculty') {
                this.renderFacultyDirectory();
            }
            
            // Add animation
            targetView.classList.add('animate-fade-in');
            setTimeout(() => {
                targetView.classList.remove('animate-fade-in');
            }, 300);
        }
    }

    renderStudentDashboard() {
        const container = document.getElementById('appointments-container');
        container.innerHTML = '';

        if (this.appointments.length === 0) {
            container.innerHTML = `
                <div class="card p-6 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                        <i data-lucide="calendar-plus" class="h-8 w-8 text-primary"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">No Appointments Yet</h3>
                    <p class="text-muted-foreground mb-4">Get started by booking your first consultation with a faculty member.</p>
                    <button class="btn btn-primary" onclick="app.openBookingModal()">
                        <i data-lucide="plus" class="h-4 w-4 mr-2"></i>
                        Book Your First Appointment
                    </button>
                </div>
            `;
        } else {
            this.appointments.forEach(appointment => {
                container.appendChild(this.createAppointmentCard(appointment));
            });
        }

        // Update stats
        const upcomingCount = this.appointments.filter(apt => apt.status === 'upcoming').length;
        const monthCount = this.appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            const now = new Date();
            return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear();
        }).length;

        document.getElementById('upcoming-count').textContent = upcomingCount;
        document.getElementById('month-count').textContent = monthCount;
        document.getElementById('total-count').textContent = this.appointments.length;

        // Re-initialize Lucide icons
        lucide.createIcons();
    }

    renderFacultyDashboard() {
        const container = document.getElementById('faculty-schedule-container');
        container.innerHTML = '';

        // Mock faculty schedule
        const todaysAppointments = [
            {
                id: 'f1',
                studentName: 'Alice Johnson',
                time: '10:00 AM',
                duration: '30 minutes',
                subject: 'Machine Learning Concepts',
                status: 'confirmed'
            },
            {
                id: 'f2',
                studentName: 'Bob Smith',
                time: '2:00 PM',
                duration: '45 minutes',
                subject: 'Thesis Discussion',
                status: 'pending'
            }
        ];

        if (todaysAppointments.length === 0) {
            container.innerHTML = `
                <div class="card p-6 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4">
                        <i data-lucide="calendar" class="h-8 w-8 text-primary"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">No Appointments Today</h3>
                    <p class="text-muted-foreground">Your schedule is clear. Take some time to set your availability.</p>
                </div>
            `;
        } else {
            todaysAppointments.forEach(appointment => {
                container.appendChild(this.createFacultyAppointmentCard(appointment));
            });
        }

        // Re-initialize Lucide icons
        lucide.createIcons();
    }

    renderFacultyDirectory() {
        const container = document.getElementById('faculty-grid');
        container.innerHTML = '';

        this.faculty.forEach(member => {
            container.appendChild(this.createFacultyCard(member));
        });

        // Re-initialize Lucide icons
        lucide.createIcons();
    }

    createAppointmentCard(appointment) {
        const card = document.createElement('div');
        card.className = 'card p-6 animate-slide-in';
        
        const statusColors = {
            upcoming: 'badge-primary',
            completed: 'badge-secondary',
            cancelled: 'badge-destructive'
        };

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-semibold">${appointment.facultyName}</h3>
                    <p class="text-muted-foreground">${appointment.facultyTitle}</p>
                </div>
                <span class="badge ${statusColors[appointment.status] || 'badge-secondary'}">
                    ${appointment.status}
                </span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm mb-4">
                <div class="flex items-center gap-2">
                    <i data-lucide="calendar" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.date}
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="clock" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.time}
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="user" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.duration}
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.location}
                </div>
            </div>
            ${appointment.notes ? `
                <div class="p-3 bg-muted rounded border-l-4 border-primary mb-4">
                    <p class="text-sm">${appointment.notes}</p>
                </div>
            ` : ''}
            <div class="flex gap-2">
                ${appointment.status === 'upcoming' ? `
                    <button class="btn btn-ghost btn-sm" onclick="app.addNote('${appointment.id}')">
                        <i data-lucide="message-square" class="h-4 w-4 mr-2"></i>
                        Add Note
                    </button>
                    <button class="btn btn-ghost btn-sm text-destructive" onclick="app.cancelAppointment('${appointment.id}')">
                        <i data-lucide="x" class="h-4 w-4 mr-2"></i>
                        Cancel
                    </button>
                ` : ''}
            </div>
        `;

        return card;
    }

    createFacultyAppointmentCard(appointment) {
        const card = document.createElement('div');
        card.className = 'card p-6 animate-slide-in';
        
        const statusColors = {
            confirmed: 'badge-success',
            pending: 'badge-warning',
            completed: 'badge-secondary'
        };

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-semibold">${appointment.studentName}</h3>
                    <p class="text-muted-foreground">${appointment.subject}</p>
                </div>
                <span class="badge ${statusColors[appointment.status] || 'badge-secondary'}">
                    ${appointment.status}
                </span>
            </div>
            <div class="flex items-center gap-4 text-sm mb-4">
                <div class="flex items-center gap-2">
                    <i data-lucide="clock" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.time}
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="timer" class="h-4 w-4 text-muted-foreground"></i>
                    ${appointment.duration}
                </div>
            </div>
            <div class="flex gap-2">
                ${appointment.status === 'pending' ? `
                    <button class="btn btn-primary btn-sm" onclick="app.confirmAppointment('${appointment.id}')">
                        <i data-lucide="check" class="h-4 w-4 mr-2"></i>
                        Confirm
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="app.declineAppointment('${appointment.id}')">
                        <i data-lucide="x" class="h-4 w-4 mr-2"></i>
                        Decline
                    </button>
                ` : `
                    <button class="btn btn-ghost btn-sm" onclick="app.rescheduleAppointment('${appointment.id}')">
                        <i data-lucide="calendar" class="h-4 w-4 mr-2"></i>
                        Reschedule
                    </button>
                `}
            </div>
        `;

        return card;
    }

    createFacultyCard(faculty) {
        const card = document.createElement('div');
        card.className = 'card p-6 animate-slide-in';

        card.innerHTML = `
            <div class="text-center mb-4">
                <div class="w-16 h-16 rounded-full bg-primary-light mx-auto mb-4 flex items-center justify-center">
                    <i data-lucide="user" class="h-8 w-8 text-primary"></i>
                </div>
                <h3 class="text-lg font-semibold">${faculty.name}</h3>
                <p class="text-muted-foreground">${faculty.title}</p>
                <span class="badge badge-secondary mt-2">${faculty.department}</span>
            </div>
            <div class="space-y-2 text-sm mb-4">
                <div class="flex items-center gap-2">
                    <i data-lucide="star" class="h-4 w-4 text-warning"></i>
                    ${faculty.rating} (${faculty.reviews} reviews)
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="clock" class="h-4 w-4 text-muted-foreground"></i>
                    ${faculty.availability}
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="book" class="h-4 w-4 text-muted-foreground"></i>
                    ${faculty.expertise}
                </div>
            </div>
            <button class="btn btn-primary w-full" onclick="app.bookWithFaculty('${faculty.id}')">
                <i data-lucide="calendar-plus" class="h-4 w-4 mr-2"></i>
                Book Appointment
            </button>
        `;

        return card;
    }

    // Modal Methods
    openBookingModal() {
        this.modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Book an Appointment</h2>
            <form id="booking-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Faculty Member</label>
                    <select class="select w-full" name="faculty" required>
                        <option value="">Select a faculty member</option>
                        ${this.faculty.map(f => `<option value="${f.id}">${f.name} - ${f.department}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Preferred Date</label>
                    <input type="date" class="input w-full" name="date" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Preferred Time</label>
                    <select class="select w-full" name="time" required>
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Purpose of Meeting</label>
                    <textarea class="input w-full" name="purpose" rows="3" placeholder="Brief description of what you'd like to discuss..."></textarea>
                </div>
                <div class="flex gap-2 pt-4">
                    <button type="submit" class="btn btn-primary">Book Appointment</button>
                    <button type="button" class="btn btn-ghost" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        this.modalOverlay.classList.remove('hidden');
        
        document.getElementById('booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmit(new FormData(e.target));
        });
    }

    openAvailabilityModal() {
        this.modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Set Your Availability</h2>
            <form id="availability-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Available Days</label>
                    <div class="grid grid-cols-2 gap-2">
                        ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => `
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="days" value="${day.toLowerCase()}" checked>
                                ${day}
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Available Hours</label>
                    <div class="flex gap-2">
                        <select class="select" name="start_time">
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                        </select>
                        <span class="flex items-center">to</span>
                        <select class="select" name="end_time">
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Consultation Duration</label>
                    <select class="select w-full" name="duration">
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>
                </div>
                <div class="flex gap-2 pt-4">
                    <button type="submit" class="btn btn-primary">Save Availability</button>
                    <button type="button" class="btn btn-ghost" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        this.modalOverlay.classList.remove('hidden');
        
        document.getElementById('availability-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAvailabilitySubmit(new FormData(e.target));
        });
    }

    closeModal() {
        this.modalOverlay.classList.add('hidden');
    }

    // Event Handlers
    handleBookingSubmit(formData) {
        const facultyId = formData.get('faculty');
        const faculty = this.faculty.find(f => f.id === facultyId);
        
        if (faculty) {
            const newAppointment = {
                id: 'apt_' + Date.now(),
                facultyName: faculty.name,
                facultyTitle: faculty.title,
                date: formData.get('date'),
                time: this.formatTime(formData.get('time')),
                duration: '45 minutes',
                status: 'upcoming',
                location: 'Room 201',
                notes: formData.get('purpose')
            };
            
            this.appointments.push(newAppointment);
            this.closeModal();
            this.showToast('Appointment booked successfully!', 'success');
            
            if (this.currentView === 'student-dashboard') {
                this.renderStudentDashboard();
            }
        }
    }

    handleAvailabilitySubmit(formData) {
        this.closeModal();
        this.showToast('Availability updated successfully!', 'success');
    }

    // Utility Methods
    formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    filterFaculty(searchTerm) {
        const cards = document.querySelectorAll('#faculty-grid .card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterByDepartment(department) {
        const cards = document.querySelectorAll('#faculty-grid .card');
        cards.forEach(card => {
            if (!department || card.textContent.includes(department.replace('-', ' '))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="h-5 w-5"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
        
        // Re-initialize Lucide icons
        lucide.createIcons();
    }

    // Mock Data Loader
    loadMockData() {
        this.faculty = [
            {
                id: 'fac_1',
                name: 'Dr. Sarah Wilson',
                title: 'Professor of Computer Science',
                department: 'Computer Science',
                rating: 4.9,
                reviews: 127,
                availability: 'Mon-Thu, 9AM-5PM',
                expertise: 'Machine Learning, AI'
            },
            {
                id: 'fac_2',
                name: 'Dr. Michael Chen',
                title: 'Associate Professor of Mathematics',
                department: 'Mathematics',
                rating: 4.7,
                reviews: 89,
                availability: 'Tue-Fri, 10AM-4PM',
                expertise: 'Statistics, Data Science'
            },
            {
                id: 'fac_3',
                name: 'Dr. Emily Rodriguez',
                title: 'Assistant Professor of Physics',
                department: 'Physics',
                rating: 4.8,
                reviews: 56,
                availability: 'Mon-Wed, 1PM-6PM',
                expertise: 'Quantum Physics, Research Methods'
            }
        ];

        this.appointments = [
            {
                id: 'apt_1',
                facultyName: 'Dr. Sarah Wilson',
                facultyTitle: 'Professor of Computer Science',
                date: '2025-09-30',
                time: '10:00 AM',
                duration: '45 minutes',
                status: 'upcoming',
                location: 'Room 201',
                notes: 'Discuss thesis proposal for machine learning project'
            },
            {
                id: 'apt_2',
                facultyName: 'Dr. Michael Chen',
                facultyTitle: 'Associate Professor of Mathematics',
                date: '2025-10-02',
                time: '2:00 PM',
                duration: '30 minutes',
                status: 'upcoming',
                location: 'Room 305'
            },
            {
                id: 'apt_3',
                facultyName: 'Dr. Emily Rodriguez',
                facultyTitle: 'Assistant Professor of Physics',
                date: '2025-09-20',
                time: '11:00 AM',
                duration: '60 minutes',
                status: 'completed',
                location: 'Lab 102'
            }
        ];
    }

    // Appointment Management Methods
    addNote(appointmentId) {
        const note = prompt('Add a note for this appointment:');
        if (note) {
            const appointment = this.appointments.find(apt => apt.id === appointmentId);
            if (appointment) {
                appointment.notes = note;
                this.renderStudentDashboard();
                this.showToast('Note added successfully!', 'success');
            }
        }
    }

    cancelAppointment(appointmentId) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            const appointment = this.appointments.find(apt => apt.id === appointmentId);
            if (appointment) {
                appointment.status = 'cancelled';
                this.renderStudentDashboard();
                this.showToast('Appointment cancelled', 'warning');
            }
        }
    }

    bookWithFaculty(facultyId) {
        // Pre-select faculty in booking modal
        this.openBookingModal();
        setTimeout(() => {
            const select = document.querySelector('select[name="faculty"]');
            if (select) {
                select.value = facultyId;
            }
        }, 100);
    }

    confirmAppointment(appointmentId) {
        // Mock faculty functionality
        this.showToast('Appointment confirmed!', 'success');
    }

    declineAppointment(appointmentId) {
        if (confirm('Are you sure you want to decline this appointment?')) {
            this.showToast('Appointment declined', 'warning');
        }
    }

    rescheduleAppointment(appointmentId) {
        this.showToast('Reschedule functionality would open a date picker', 'info');
    }
}

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new ProfLinkApp();
});