document.addEventListener('DOMContentLoaded', () => {

    // --- Get all the necessary elements from the page ---
    const loginPopup = document.getElementById('login-popup');
    const loginBtn = document.getElementById('login-btn');
    const closeBtn = document.querySelector('.popup-container .close-btn');
    const tabs = document.querySelectorAll('.tab');
    const formContents = document.querySelectorAll('.form-content');

    // --- Function to show the popup ---
    const showPopup = () => {
        loginPopup.style.display = 'flex';
    };

    // --- Function to hide the popup ---
    const hidePopup = () => {
        loginPopup.style.display = 'none';
    };

    // --- AUTO-POPUP LOGIC ---
    setTimeout(showPopup, 2500);

    // --- MANUAL TRIGGER LOGIC ---
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        showPopup();
    });

    // --- HIDE POPUP LOGIC ---
    closeBtn.addEventListener('click', hidePopup);
    loginPopup.addEventListener('click', (event) => {
        if (event.target === loginPopup) {
            hidePopup();
        }
    });

    // --- TAB SWITCHING LOGIC ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            formContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const formId = tab.getAttribute('data-form');
            document.getElementById(formId).classList.add('active');
        });
    });
});
