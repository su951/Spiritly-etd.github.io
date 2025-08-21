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
