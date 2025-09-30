
class ComponentUtils {
    static createElement(tag, className = '', innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    static createButton(text, className = 'btn btn-primary', onClick = null) {
        const button = this.createElement('button', className, text);
        if (onClick) button.addEventListener('click', onClick);
        return button;
    }

    static createCard(content, className = 'card p-6') {
        return this.createElement('div', className, content);
    }

    static createInput(type = 'text', className = 'input', placeholder = '') {
        const input = document.createElement('input');
        input.type = type;
        input.className = className;
        if (placeholder) input.placeholder = placeholder;
        return input;
    }

    static createSelect(options = [], className = 'select') {
        const select = document.createElement('select');
        select.className = className;
        
        options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value || option;
            optElement.textContent = option.text || option;
            select.appendChild(optElement);
        });
        
        return select;
    }
}

// Form Validation Utilities
class FormValidator {
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static validateRequired(value) {
        return value && value.trim() !== '';
    }

    static validateDate(date) {
        const today = new Date();
        const inputDate = new Date(date);
        return inputDate >= today;
    }

    static validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, rule] of Object.entries(rules)) {
            const value = formData.get(field);
            
            if (rule.required && !this.validateRequired(value)) {
                errors[field] = `${rule.label || field} is required`;
                continue;
            }
            
            if (rule.type === 'email' && value && !this.validateEmail(value)) {
                errors[field] = 'Please enter a valid email address';
            }
            
            if (rule.type === 'date' && value && !this.validateDate(value)) {
                errors[field] = 'Please select a future date';
            }
            
            if (rule.minLength && value && value.length < rule.minLength) {
                errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    static displayErrors(errors, formElement) {
        // Clear existing errors
        formElement.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Display new errors
        for (const [field, message] of Object.entries(errors)) {
            const fieldElement = formElement.querySelector(`[name="${field}"]`);
            if (fieldElement) {
                const errorDiv = ComponentUtils.createElement('div', 'error-message text-destructive text-sm mt-1', message);
                fieldElement.parentNode.appendChild(errorDiv);
                fieldElement.classList.add('border-destructive');
            }
        }
    }

    static clearErrors(formElement) {
        formElement.querySelectorAll('.error-message').forEach(el => el.remove());
        formElement.querySelectorAll('input, select, textarea').forEach(el => {
            el.classList.remove('border-destructive');
        });
    }
}

// Date and Time Utilities
class DateTimeUtils {
    static formatDate(date, format = 'MM/DD/YYYY') {
        if (!date) return '';
        
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        
        switch (format) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'long':
                return d.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            default:
                return d.toLocaleDateString();
        }
    }

    static formatTime(time24, format = '12h') {
        if (!time24) return '';
        
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        
        if (format === '12h') {
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        }
        
        return `${hours}:${minutes}`;
    }

    static getTimeOptions(startHour = 9, endHour = 17, interval = 60) {
        const options = [];
        
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                options.push({
                    value: timeString,
                    text: this.formatTime(timeString)
                });
            }
        }
        
        return options;
    }

    static isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return today.toDateString() === checkDate.toDateString();
    }

    static isUpcoming(date, time) {
        const now = new Date();
        const checkDateTime = new Date(`${date} ${time}`);
        return checkDateTime > now;
    }

    static getRelativeTime(date) {
        const now = new Date();
        const checkDate = new Date(date);
        const diffTime = checkDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
        if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
        
        return this.formatDate(date, 'long');
    }
}

// Local Storage Utilities
class StorageUtils {
    static setItem(key, value) {
        try {
            localStorage.setItem(`proflink_${key}`, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    static getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`proflink_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return defaultValue;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(`proflink_${key}`);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith('proflink_'))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
}

// Animation Utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = `all ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            element.style.transition = '';
        }, duration);
    }

    static slideIn(element, direction = 'right', duration = 300) {
        const translateMap = {
            right: 'translateX(20px)',
            left: 'translateX(-20px)',
            up: 'translateY(-20px)',
            down: 'translateY(20px)'
        };
        
        element.style.opacity = '0';
        element.style.transform = translateMap[direction];
        element.style.transition = `all ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
        }, 10);
        
        setTimeout(() => {
            element.style.transition = '';
        }, duration);
    }

    static pulse(element, duration = 600) {
        element.style.animation = `pulse ${duration}ms ease-in-out`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
}

// Search and Filter Utilities
class SearchUtils {
    static fuzzySearch(query, items, searchFields) {
        if (!query || query.length < 2) return items;
        
        const queryLower = query.toLowerCase();
        
        return items.filter(item => {
            return searchFields.some(field => {
                const value = this.getNestedValue(item, field);
                return value && value.toLowerCase().includes(queryLower);
            });
        });
    }

    static getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    static highlightMatches(text, query) {
        if (!query || query.length < 2) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    static sortBy(items, field, direction = 'asc') {
        return [...items].sort((a, b) => {
            const valueA = this.getNestedValue(a, field);
            const valueB = this.getNestedValue(b, field);
            
            if (valueA < valueB) return direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
}

// Export utilities for use in other scripts
window.ComponentUtils = ComponentUtils;
window.FormValidator = FormValidator;
window.DateTimeUtils = DateTimeUtils;
window.StorageUtils = StorageUtils;
window.AnimationUtils = AnimationUtils;
window.SearchUtils = SearchUtils;