import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Clock, Mail, Phone } from 'lucide-react';
import { useMockData } from '../data/MockDataService';

const FacultyDirectory = () => {
    const [faculty, setFaculty] = useState([]);
    const [filteredFaculty, setFilteredFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    
    const dataService = useMockData();

    useEffect(() => {
        loadFaculty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filterFaculty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faculty, searchTerm, selectedDepartment]);

    const loadFaculty = async () => {
        try {
            setLoading(true);
            const response = await dataService.getFaculty();
            if (response.success) {
                setFaculty(response.data);
                setFilteredFaculty(response.data);
            }
        } catch (error) {
            console.error('Error loading faculty:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterFaculty = () => {
        let filtered = [...faculty];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(f => 
                f.name.toLowerCase().includes(searchLower) ||
                f.department.toLowerCase().includes(searchLower) ||
                f.expertise.some(e => e.toLowerCase().includes(searchLower))
            );
        }

        if (selectedDepartment) {
            filtered = filtered.filter(f => 
                f.department.toLowerCase().includes(selectedDepartment.toLowerCase())
            );
        }

        setFilteredFaculty(filtered);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDepartmentFilter = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
        ));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Loading faculty directory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Faculty Directory</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="Search faculty..." 
                            className="input pl-10"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <select 
                        className="select"
                        value={selectedDepartment}
                        onChange={handleDepartmentFilter}
                    >
                        <option value="">All Departments</option>
                        <option value="computer-science">Computer Science</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="biology">Biology</option>
                    </select>
                </div>
            </div>
            
            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredFaculty.length} of {faculty.length} faculty members
            </div>
            
            {/* Faculty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFaculty.map((member) => (
                    <div key={member.id} className="card p-6">
                        <div className="space-y-4">
                            {/* Header */}
                            <div>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-muted-foreground">{member.title}</p>
                                <p className="text-sm text-primary font-medium">{member.department}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {renderStars(member.rating)}
                                </div>
                                <span className="text-sm font-medium">{member.rating}</span>
                                <span className="text-sm text-muted-foreground">({member.totalReviews} reviews)</span>
                            </div>

                            {/* Expertise */}
                            <div>
                                <p className="text-sm font-medium mb-2">Expertise:</p>
                                <div className="flex flex-wrap gap-1">
                                    {member.expertise.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="badge badge-secondary text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                    {member.expertise.length > 3 && (
                                        <span className="badge badge-secondary text-xs">
                                            +{member.expertise.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Contact & Office */}
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{member.office}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{member.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{member.consultationDuration} min consultations</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {member.bio}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <button className="btn btn-primary flex-1">
                                    Book Appointment
                                </button>
                                <button className="btn btn-secondary">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredFaculty.length === 0 && (
                <div className="card p-6 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Faculty Found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms or department filter.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FacultyDirectory;