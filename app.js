  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCjduPnewYPgA6iM2kHB_lsKFfBn7oWTU0",
    authDomain: "spiritly-ae536.firebaseapp.com",
    projectId: "spiritly-ae536",
    storageBucket: "spiritly-ae536.firebasestorage.app",
    messagingSenderId: "160769508942",
    appId: "1:160769508942:web:d447c0a8e102a441bce51f",
    measurementId: "G-7L4XXDTS4C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  document.addEventListener('DOMContentLoaded', function() {
      // Initialize Firebase services
      const app = firebase.initializeApp(firebaseConfig);
      const analytics = firebase.analytics(app);
      const db = firebase.firestore();
      const storage = firebase.storage(app);
      
 // Get form element
      const contactForm = document.getElementById('contactForm');
          if (!contactForm) return; // Exit if form doesn't exist
  
      // Single event listener for form submission
      contactForm.addEventListener('submit', async function(event) {
          event.preventDefault();
          

  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // Single async event listener for form submission
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      // Get form values
      const name = contactForm['name'].value;
      const email = contactForm['email'].value;
      const topic = contactForm['topic'].value;
      const message = contactForm['message'].value;
      
      // Basic validation
      if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill out all required fields.';
        return;
      }

      // UI Loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Save to Firestore using modular functions
        const docRef = await addDoc(collection(db, 'contactusp'), {
          name: name,
          email: email,
          topic: topic,
          message: message,
          timestamp: serverTimestamp()
        });

        // Log a success message to the console
        console.log("Document successfully written with ID: ", docRef.id);
        
        // Analytics (using modular function)
        logEvent(analytics, 'contact_form_submitted');

        // Success action
        formMessage.style.color = 'green';
        formMessage.textContent = "🙏 Thank you! Your message has been received. We'll contact you soon.";
        contactForm.reset();

        // After successful submission, redirect to WhatsApp
        redirectToWhatsApp();

      } catch (e) {
        console.error("Error adding document: ", e);
        formMessage.style.color = 'red';
        formMessage.textContent = 'An error occurred. Please try again later.';
      } finally {
        // Reset UI state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Your Message ✨';
      }
    });

    // Helper function to redirect to WhatsApp
    function redirectToWhatsApp() {
      const whatsappGroupLink = "https://chat.whatsapp.com/your-group-link"; // Replace with your link
      window.location.href = whatsappGroupLink;
    }
  });
  // Allow form submission with Enter key
      contactForm.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' && !contactForm.querySelector('button[type="submit"]').disabled) {
              event.preventDefault(); // Prevent default form submission
              contactForm.dispatchEvent(new Event('submit')); // Trigger the submit event
          }
      });
  });
