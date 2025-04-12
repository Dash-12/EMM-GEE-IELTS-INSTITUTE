document.addEventListener('DOMContentLoaded', function() {

    // --- Responsive Navigation ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const menuIcon = mobileMenuToggle ? mobileMenuToggle.querySelector('i') : null;

    if (mobileMenuToggle && mainNav && menuIcon) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Toggle Icon Class
            if (mainNav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // --- Smooth Scrolling & Close Mobile Menu on Link Click ---
    const smoothScrollLinks = document.querySelectorAll('nav#mainNav a[href^="#"]:not([href="#"])');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if(menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const emailInput = document.getElementById('email');
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        const formError = document.getElementById('formError');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formError.style.display = 'none';
            formError.textContent = ''; // Clear previous error message
            let isValid = true;

            // Reset borders
            [nameInput, emailInput, messageInput].forEach(input => input.style.borderColor = '#555');

            // Validate Name
            if (nameInput.value.trim() === '') {
                 isValid = false;
                 nameInput.style.borderColor = 'red';
            }

            // Validate Email
            if (emailInput.value.trim() === '' || !validateEmail(emailInput.value.trim())) {
                 isValid = false;
                 emailInput.style.borderColor = 'red';
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                 isValid = false;
                 messageInput.style.borderColor = 'red';
            }

            // Show error if invalid
            if (!isValid) {
                formError.textContent = 'Please fill out all required fields correctly.';
                formError.style.display = 'block';
            } else {
                // Validation successful - In a real app, send data here
                console.log("Validation successful! Form data would be sent here.");
                alert("Thank you for your enquiry! We will get back to you soon.");
                contactForm.reset(); // Clear the form
                // Optionally clear border colors if needed, though reset should suffice
            }
        });

         // Helper function for basic email validation
         function validateEmail(email) {
             const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             return re.test(String(email).toLowerCase());
         }

         // Remove red border and error on input
         [nameInput, emailInput, messageInput].forEach(input => {
            if(input){ // Check if element exists
                input.addEventListener('input', () => {
                    input.style.borderColor = '#555'; // Reset border to default for dark bg
                    if(formError) formError.style.display = 'none';
                });
            }
         });
    }

    // --- Footer: Update Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded