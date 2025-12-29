/**
 * Masala & Mozzarella Café - Main JavaScript
 * Handles: Navigation, Form Validation, Dark Mode, Gallery Modal, Today's Special
 */

(function() {
    'use strict';

    // ============================================
    // Initialize on DOM Content Loaded
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initDarkMode();
        initGalleryModal();
        initFormValidation();
        initTodaysSpecial();
        initSmoothScroll();
        initTableBooking();
    });

    // ============================================
    // Navigation: Sticky Navbar & Active Links
    // ============================================
    function initNavigation() {
        const navbar = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add scroll effect to navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update active link based on scroll position
            updateActiveLink(navLinks);
        });
        
        // Update active link on click
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
        
        // Initial active link update
        updateActiveLink(navLinks);
    }

    function updateActiveLink(navLinks) {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (href === '#' || href === '') {
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 76; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Dark Mode Toggle with localStorage
    // ============================================
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        const html = document.documentElement;
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        updateDarkModeIcon(currentTheme, darkModeIcon);
        
        // Toggle dark mode on button click
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateDarkModeIcon(newTheme, darkModeIcon);
            });
        }
    }

    function updateDarkModeIcon(theme, icon) {
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-stars');
                icon.classList.add('bi-sun');
            } else {
                icon.classList.remove('bi-sun');
                icon.classList.add('bi-moon-stars');
            }
        }
    }

    // ============================================
    // Gallery Modal Lightbox
    // ============================================
    function initGalleryModal() {
        const galleryImages = document.querySelectorAll('.gallery-img');
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const imageSrc = this.getAttribute('data-bs-image') || this.getAttribute('src');
                const imageAlt = this.getAttribute('alt');
                
                if (modalImage) {
                    modalImage.setAttribute('src', imageSrc);
                    modalImage.setAttribute('alt', imageAlt);
                }
            });
        });
        
        // Clear image when modal is hidden to improve performance
        if (modal) {
            modal.addEventListener('hidden.bs.modal', function() {
                if (modalImage) {
                    modalImage.setAttribute('src', '');
                }
            });
        }
    }

    // ============================================
    // Form Validation
    // ============================================
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        const formError = document.getElementById('formError');
        
        if (!form) return;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Hide previous messages
            if (formSuccess) formSuccess.classList.add('d-none');
            if (formError) formError.classList.add('d-none');
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            // Special email validation
            const emailField = document.getElementById('email');
            if (emailField && !validateEmail(emailField.value)) {
                emailField.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission (replace with actual API call)
                submitForm(form, formSuccess, formError);
            } else {
                // Focus on first invalid field
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            
            form.classList.add('was-validated');
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        let isValid = true;
        
        // Remove previous validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        // Check if required field is empty
        if (isRequired && value === '') {
            field.classList.add('is-invalid');
            isValid = false;
        }
        // Validate email format
        else if (field.type === 'email' && value !== '') {
            if (!validateEmail(value)) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.add('is-valid');
            }
        }
        // Validate phone format (optional field)
        else if (field.type === 'tel' && value !== '') {
            if (!validatePhone(value)) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.add('is-valid');
            }
        }
        // Valid field
        else if (value !== '') {
            field.classList.add('is-valid');
        }
        
        return isValid;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        // Allow various phone formats: (123) 456-7890, 123-456-7890, 1234567890, +1 123 456 7890
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function submitForm(form, successElement, errorElement) {
        // Simulate API call (replace with actual form submission)
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simulate async submission
        setTimeout(() => {
            // In a real application, you would make an API call here
            console.log('Form data:', data);
            
            // Show success message
            if (successElement) {
                successElement.classList.remove('d-none');
                successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Reset form
            form.reset();
            form.classList.remove('was-validated');
            
            // Remove validation classes
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
            
            // Hide success message after 5 seconds
            if (successElement) {
                setTimeout(() => {
                    successElement.classList.add('d-none');
                }, 5000);
            }
        }, 500);
    }

    // ============================================
    // Today's Special Badge (Day-based)
    // ============================================
    function initTodaysSpecial() {
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        const specialBadges = document.querySelectorAll('[id^="special-badge-"]');
        
        // Define which menu items are special on which days
        // Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6
        const specialSchedule = {
            0: [], // Sunday - no specials
            1: ['special-badge-1'], // Monday - Butter Chicken Pizza
            2: ['special-badge-1'], // Tuesday - Butter Chicken Pizza
            3: [], // Wednesday - no specials
            4: [], // Thursday - no specials
            5: ['special-badge-1'], // Friday - Butter Chicken Pizza
            6: ['special-badge-1'] // Saturday - Butter Chicken Pizza
        };
        
        // Hide all special badges first
        specialBadges.forEach(badge => {
            badge.style.display = 'none';
        });
        
        // Show badges for today's specials
        if (specialSchedule[today] && specialSchedule[today].length > 0) {
            specialSchedule[today].forEach(badgeId => {
                const badge = document.getElementById(badgeId);
                if (badge) {
                    badge.style.display = 'block';
                }
            });
        }
    }

    // ============================================
    // Accessibility: Skip Link
    // ============================================
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark if it doesn't exist
    const heroSection = document.getElementById('home');
    if (heroSection && !document.getElementById('main-content')) {
        heroSection.setAttribute('id', 'main-content');
    }

    // ============================================
    // Lazy Loading for Images (Performance)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Table Booking System
    // ============================================
    function initTableBooking() {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const bookingDate = document.getElementById('bookingDate');
        const availabilityDate = document.getElementById('availabilityDate');
        
        if (bookingDate) {
            bookingDate.setAttribute('min', today);
            bookingDate.value = today;
        }
        
        if (availabilityDate) {
            availabilityDate.setAttribute('min', today);
            availabilityDate.value = today;
        }
        
        // Initialize tables
        initializeTables();
        
        // Load table availability for today
        const availabilityTime = document.getElementById('availabilityTime');
        if (availabilityDate) {
            updateTableAvailability(today);
            availabilityDate.addEventListener('change', function() {
                const time = availabilityTime?.value || document.getElementById('bookingTime')?.value || '';
                updateTableAvailability(this.value);
            });
        }
        
        if (availabilityTime) {
            availabilityTime.addEventListener('change', function() {
                const date = availabilityDate?.value || document.getElementById('bookingDate')?.value || today;
                updateTableAvailability(date);
            });
        }
        
        // Update table dropdown and availability when date/time changes
        if (bookingDate) {
            bookingDate.addEventListener('change', function() {
                const time = document.getElementById('bookingTime')?.value || '';
                updateTableDropdown(this.value, time);
                // Sync availability date with booking date
                if (availabilityDate) {
                    availabilityDate.value = this.value;
                }
                if (time) {
                    updateTableAvailability(this.value);
                }
            });
        }
        
        const bookingTime = document.getElementById('bookingTime');
        if (bookingTime) {
            bookingTime.addEventListener('change', function() {
                const date = document.getElementById('bookingDate')?.value || today;
                updateTableDropdown(date, this.value);
                // Update table availability when time changes
                updateTableAvailability(date);
                // Sync availability time with booking time
                if (availabilityTime) {
                    availabilityTime.value = this.value;
                }
            });
        }
        
        // Update table availability when guests change
        const bookingGuests = document.getElementById('bookingGuests');
        if (bookingGuests) {
            bookingGuests.addEventListener('change', function() {
                const date = document.getElementById('bookingDate')?.value;
                const time = document.getElementById('bookingTime')?.value;
                if (date && time) {
                    updateTableDropdown(date, time);
                }
            });
        }
        
        // Sync availability date/time with booking form
        if (availabilityDate && bookingDate) {
            availabilityDate.addEventListener('change', function() {
                bookingDate.value = this.value;
                const time = availabilityTime?.value || bookingTime?.value || '';
                if (time) {
                    updateTableAvailability(this.value);
                }
            });
        }
        
        if (availabilityTime && bookingTime) {
            availabilityTime.addEventListener('change', function() {
                bookingTime.value = this.value;
                const date = availabilityDate?.value || bookingDate?.value || today;
                updateTableDropdown(date, this.value);
                updateTableAvailability(date);
            });
        }
        
        // Handle booking form submission
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBookingSubmit);
        }
        
        // Load user's bookings
        loadMyBookings();
    }

    // Initialize table structure
    function initializeTables() {
        // Create 12 tables with different capacities
        const tables = [
            { id: 1, capacity: 2, name: 'Table 1' },
            { id: 2, capacity: 2, name: 'Table 2' },
            { id: 3, capacity: 4, name: 'Table 3' },
            { id: 4, capacity: 4, name: 'Table 4' },
            { id: 5, capacity: 4, name: 'Table 5' },
            { id: 6, capacity: 4, name: 'Table 6' },
            { id: 7, capacity: 6, name: 'Table 7' },
            { id: 8, capacity: 6, name: 'Table 8' },
            { id: 9, capacity: 6, name: 'Table 9' },
            { id: 10, capacity: 8, name: 'Table 10' },
            { id: 11, capacity: 8, name: 'Table 11' },
            { id: 12, capacity: 8, name: 'Table 12' }
        ];
        
        // Store tables in localStorage if not exists
        if (!localStorage.getItem('restaurantTables')) {
            localStorage.setItem('restaurantTables', JSON.stringify(tables));
        }
    }

    // Get all bookings from localStorage
    function getAllBookings() {
        const bookings = localStorage.getItem('tableBookings');
        return bookings ? JSON.parse(bookings) : [];
    }

    // Save booking to localStorage
    function saveBooking(booking) {
        const bookings = getAllBookings();
        bookings.push(booking);
        localStorage.setItem('tableBookings', JSON.stringify(bookings));
    }

    // Get bookings for a specific date and time
    function getBookingsForDateTime(date, time) {
        const bookings = getAllBookings();
        return bookings.filter(booking => 
            booking.date === date && booking.time === time
        );
    }

    // Check if table is available for a specific date and time
    function isTableAvailable(tableId, date, time) {
        const bookings = getBookingsForDateTime(date, time);
        return !bookings.some(booking => booking.tableId === tableId);
    }

    // Update table availability display
    function updateTableAvailability(date) {
        const tablesGrid = document.getElementById('tablesGrid');
        if (!tablesGrid) return;
        
        const tables = JSON.parse(localStorage.getItem('restaurantTables') || '[]');
        // Check availability time selector first, then booking form time
        const selectedTime = document.getElementById('availabilityTime')?.value || 
                            document.getElementById('bookingTime')?.value || '';
        const userEmail = localStorage.getItem('userEmail') || '';
        const allBookings = getAllBookings();
        
        tablesGrid.innerHTML = '';
        
        // Get all user bookings for this date (across all times)
        const userBookingsForDate = allBookings.filter(b => 
            b.email === userEmail && b.date === date
        );
        
        // If no time selected, show tables with indication of user bookings
        if (!selectedTime) {
            tables.forEach(table => {
                // Check if user has booked this table on this date
                const userBooking = userBookingsForDate.find(b => b.tableId === table.id);
                const allBookingsForTable = allBookings.filter(b => 
                    b.tableId === table.id && b.date === date
                );
                
                let statusClass = 'bg-secondary';
                let statusIcon = 'bi-table';
                let statusText = 'Select time to view status';
                let additionalInfo = '';
                
                if (userBooking) {
                    statusClass = 'bg-warning';
                    statusIcon = 'bi-clock';
                    statusText = 'Your Booking';
                    additionalInfo = `<small class="d-block mt-1">${formatTime(userBooking.time)}</small>`;
                } else if (allBookingsForTable.length > 0) {
                    statusClass = 'bg-info';
                    statusIcon = 'bi-info-circle';
                    statusText = `${allBookingsForTable.length} booking(s)`;
                    additionalInfo = '<small class="d-block mt-1">Select time for details</small>';
                }
                
                const tableCard = document.createElement('div');
                tableCard.className = 'col-md-3 col-sm-4 col-6';
                tableCard.innerHTML = `
                    <div class="table-card card h-100 text-center ${statusClass} text-white">
                        <div class="card-body">
                            <i class="bi ${statusIcon} display-6 d-block mb-2"></i>
                            <h5 class="card-title">${table.name}</h5>
                            <p class="card-text mb-1">Capacity: ${table.capacity}</p>
                            <small class="d-block">${statusText}</small>
                            ${additionalInfo}
                        </div>
                    </div>
                `;
                
                tablesGrid.appendChild(tableCard);
            });
            return;
        }
        
        // Time selected - show detailed status
        tables.forEach(table => {
            const isAvailable = isTableAvailable(table.id, date, selectedTime);
            const bookings = getBookingsForDateTime(date, selectedTime);
            const userBooking = bookings.find(b => b.email === userEmail && b.tableId === table.id);
            
            // Also check if user has any booking for this table on this date (even if different time)
            const userBookingAnyTime = userBookingsForDate.find(b => b.tableId === table.id);
            
            let statusClass = 'bg-success';
            let statusIcon = 'bi-check-circle';
            let statusText = 'Available';
            let additionalInfo = '';
            
            if (userBooking) {
                // User has booking for this exact time
                statusClass = 'bg-warning';
                statusIcon = 'bi-calendar-check';
                statusText = 'Your Booking';
                additionalInfo = `<small class="d-block mt-1 fw-bold">${userBooking.guests} guest(s)</small>`;
            } else if (userBookingAnyTime) {
                // User has booking for this table but different time
                statusClass = 'bg-info';
                statusIcon = 'bi-clock-history';
                statusText = 'Your Booking';
                additionalInfo = `<small class="d-block mt-1">At ${formatTime(userBookingAnyTime.time)}</small>`;
            } else if (!isAvailable) {
                // Table is booked by someone else
                statusClass = 'bg-danger';
                statusIcon = 'bi-x-circle';
                statusText = 'Booked';
                const otherBooking = bookings.find(b => b.tableId === table.id);
                if (otherBooking) {
                    additionalInfo = `<small class="d-block mt-1">${otherBooking.guests} guest(s)</small>`;
                }
            }
            
            const tableCard = document.createElement('div');
            tableCard.className = 'col-md-3 col-sm-4 col-6';
            tableCard.innerHTML = `
                <div class="table-card card h-100 text-center ${statusClass} text-white">
                    <div class="card-body">
                        <i class="bi ${statusIcon} display-6 d-block mb-2"></i>
                        <h5 class="card-title">${table.name}</h5>
                        <p class="card-text mb-1">Capacity: ${table.capacity}</p>
                        <small class="d-block fw-bold">${statusText}</small>
                        ${additionalInfo}
                    </div>
                </div>
            `;
            
            tablesGrid.appendChild(tableCard);
        });
    }

    // Update table dropdown in booking form
    function updateTableDropdown(date, time) {
        const tableSelect = document.getElementById('bookingTable');
        if (!tableSelect || !date || !time) return;
        
        const tables = JSON.parse(localStorage.getItem('restaurantTables') || '[]');
        const guests = parseInt(document.getElementById('bookingGuests')?.value || '0');
        
        // Clear existing options except first
        tableSelect.innerHTML = '<option value="">Any Available Table</option>';
        
        tables.forEach(table => {
            if (table.capacity >= guests && isTableAvailable(table.id, date, time)) {
                const option = document.createElement('option');
                option.value = table.id;
                option.textContent = `${table.name} (${table.capacity} seats)`;
                tableSelect.appendChild(option);
            }
        });
    }

    // Handle booking form submission
    function handleBookingSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const form = e.target;
        const formData = new FormData(form);
        const bookingDate = formData.get('bookingDate');
        const bookingTime = formData.get('bookingTime');
        const bookingGuests = parseInt(formData.get('bookingGuests'));
        const bookingTable = formData.get('bookingTable');
        const bookingName = formData.get('bookingName');
        const bookingEmail = formData.get('bookingEmail');
        const bookingPhone = formData.get('bookingPhone');
        const bookingSpecial = formData.get('bookingSpecial');
        
        // Validate form
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Validate date is not in the past
        const selectedDate = new Date(bookingDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showBookingError('Cannot book tables for past dates. Please select a future date.');
            return;
        }
        
        // Validate date and time combination is not in the past
        const selectedDateTime = new Date(bookingDate + 'T' + bookingTime + ':00');
        if (selectedDateTime < new Date()) {
            showBookingError('Cannot book tables for past time slots. Please select a future date and time.');
            return;
        }
        
        // Get available tables
        const tables = JSON.parse(localStorage.getItem('restaurantTables') || '[]');
        let selectedTableId = null;
        
        if (bookingTable) {
            // User selected a specific table
            selectedTableId = parseInt(bookingTable);
            if (!isTableAvailable(selectedTableId, bookingDate, bookingTime)) {
                showBookingError('Selected table is no longer available. Please choose another table.');
                updateTableDropdown(bookingDate, bookingTime);
                return;
            }
        } else {
            // Find an available table that fits the number of guests
            const availableTables = tables.filter(table => 
                table.capacity >= bookingGuests && 
                isTableAvailable(table.id, bookingDate, bookingTime)
            );
            
            if (availableTables.length === 0) {
                showBookingError('No tables available for the selected date and time. Please choose a different time slot.');
                return;
            }
            
            // Select the smallest table that fits
            selectedTableId = availableTables.sort((a, b) => a.capacity - b.capacity)[0].id;
        }
        
        // Create booking
        const booking = {
            id: 'BK' + Date.now(),
            name: bookingName,
            email: bookingEmail,
            phone: bookingPhone,
            date: bookingDate,
            time: bookingTime,
            guests: bookingGuests,
            tableId: selectedTableId,
            tableName: tables.find(t => t.id === selectedTableId).name,
            specialRequests: bookingSpecial,
            createdAt: new Date().toISOString()
        };
        
        // Save booking
        saveBooking(booking);
        
        // Store user email for filtering user bookings
        localStorage.setItem('userEmail', bookingEmail);
        
        // Show success message
        showBookingSuccess(booking.id);
        
        // Update availability date and time to show the booking
        if (availabilityDate) {
            availabilityDate.value = bookingDate;
        }
        if (availabilityTime) {
            availabilityTime.value = bookingTime;
        }
        
        // Update displays immediately to show the booking
        updateTableAvailability(bookingDate);
        loadMyBookings();
        
        // Scroll to availability section to show the booking
        setTimeout(() => {
            const availabilitySection = document.getElementById('tablesGrid');
            if (availabilitySection) {
                availabilitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
        
        // Reset form after showing the booking (keep date/time for reference)
        setTimeout(() => {
            form.reset();
            form.classList.remove('was-validated');
            
            // Keep the booking date and time in availability viewer so user can see their booking
            // Only reset the form fields, not the availability viewer
        }, 1000);
    }

    // Show booking success message
    function showBookingSuccess(bookingId) {
        const successAlert = document.getElementById('bookingSuccess');
        const errorAlert = document.getElementById('bookingError');
        const bookingIdSpan = document.getElementById('bookingId');
        
        if (successAlert && bookingIdSpan) {
            bookingIdSpan.textContent = bookingId;
            successAlert.classList.remove('d-none');
            if (errorAlert) errorAlert.classList.add('d-none');
            
            // Scroll to success message
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide after 5 seconds
            setTimeout(() => {
                successAlert.classList.add('d-none');
            }, 5000);
        }
    }

    // Show booking error message
    function showBookingError(message) {
        const errorAlert = document.getElementById('bookingError');
        const errorMessage = document.getElementById('bookingErrorMessage');
        const successAlert = document.getElementById('bookingSuccess');
        
        if (errorAlert && errorMessage) {
            errorMessage.textContent = message;
            errorAlert.classList.remove('d-none');
            if (successAlert) successAlert.classList.add('d-none');
            
            // Scroll to error message
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Load and display user's bookings
    function loadMyBookings() {
        const myBookingsList = document.getElementById('myBookingsList');
        const noBookings = document.getElementById('noBookings');
        const userEmail = localStorage.getItem('userEmail') || '';
        
        if (!myBookingsList) return;
        
        const allBookings = getAllBookings();
        const userBookings = allBookings
            .filter(booking => booking.email === userEmail)
            .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
        
        if (userBookings.length === 0) {
            myBookingsList.innerHTML = '';
            if (noBookings) noBookings.classList.remove('d-none');
            return;
        }
        
        if (noBookings) noBookings.classList.add('d-none');
        
        myBookingsList.innerHTML = '';
        
        userBookings.forEach(booking => {
            const bookingCard = document.createElement('div');
            bookingCard.className = 'card mb-3';
            bookingCard.innerHTML = `
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h5 class="card-title mb-2">${booking.tableName}</h5>
                            <p class="card-text mb-1">
                                <i class="bi bi-calendar-event me-2"></i>
                                <strong>Date:</strong> ${formatDate(booking.date)}
                            </p>
                            <p class="card-text mb-1">
                                <i class="bi bi-clock me-2"></i>
                                <strong>Time:</strong> ${formatTime(booking.time)}
                            </p>
                            <p class="card-text mb-1">
                                <i class="bi bi-people me-2"></i>
                                <strong>Guests:</strong> ${booking.guests}
                            </p>
                            ${booking.specialRequests ? `
                                <p class="card-text mb-0">
                                    <i class="bi bi-chat-left-text me-2"></i>
                                    <strong>Special Requests:</strong> ${booking.specialRequests}
                                </p>
                            ` : ''}
                            <p class="card-text mt-2 mb-0">
                                <small class="text-muted">Booking ID: ${booking.id}</small>
                            </p>
                        </div>
                        <div class="col-md-4 text-md-end mt-3 mt-md-0">
                            <button class="btn btn-danger btn-sm" onclick="cancelBooking('${booking.id}')">
                                <i class="bi bi-x-circle me-1"></i>Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            myBookingsList.appendChild(bookingCard);
        });
    }

    // Cancel booking
    function cancelBooking(bookingId) {
        if (!confirm('Are you sure you want to cancel this booking?')) {
            return;
        }
        
        const bookings = getAllBookings();
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('tableBookings', JSON.stringify(updatedBookings));
        
        // Update displays
        const availabilityDate = document.getElementById('availabilityDate')?.value || new Date().toISOString().split('T')[0];
        updateTableAvailability(availabilityDate);
        loadMyBookings();
        
        // Show success message
        alert('Booking cancelled successfully!');
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Format time for display
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    // Make cancelBooking available globally
    window.cancelBooking = cancelBooking;

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%cMasala & Mozzarella Café', 'color: #d32f2f; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to our website!', 'color: #f57c00; font-size: 14px;');

})();

