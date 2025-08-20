document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU TOGGLE LOGIC ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            // Toggle icon between bars and close
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }

    // --- POPUP AND TAB LOGIC ---
    const loginPopup = document.getElementById('login-popup');
    const loginBtn = document.getElementById('login-btn');
    const closeBtn = document.querySelector('.popup-container .close-btn');
    const tabs = document.querySelectorAll('.tab');
    const formContents = document.querySelectorAll('.form-content');

    // Check if all necessary elements for the popup exist
    if (loginPopup && loginBtn && closeBtn && tabs.length > 0 && formContents.length > 0) {
        
        // --- Function to show the popup ---
        const showPopup = () => {
            loginPopup.style.display = 'flex';
        };

        // --- Function to hide the popup ---
        const hidePopup = () => {
            loginPopup.style.display = 'none';
        };

        // --- AUTO-POPUP LOGIC ---
        // Automatically show the popup after 2.5 seconds
        setTimeout(showPopup, 2500);

        // --- MANUAL TRIGGER LOGIC ---
        // Show popup when the 'Join' button is clicked
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            showPopup();
        });

        // --- HIDE POPUP LOGIC ---
        // Hide popup when the close button is clicked
        closeBtn.addEventListener('click', hidePopup);

        // Hide popup when clicking on the background overlay
        loginPopup.addEventListener('click', (event) => {
            if (event.target === loginPopup) {
                hidePopup();
            }
        });

        // --- TAB SWITCHING LOGIC ---
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs and forms
                tabs.forEach(item => item.classList.remove('active'));
                formContents.forEach(content => content.classList.remove('active'));

                // Activate the clicked tab and its corresponding form
                tab.classList.add('active');
                const formId = tab.getAttribute('data-form');
                const activeForm = document.getElementById(formId);
                if (activeForm) {
                    activeForm.classList.add('active');
                }
            });
        });
    }
});
