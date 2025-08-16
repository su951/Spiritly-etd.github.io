// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCjduPnewYPgA6iM2kHB_lsKFfBn7oWTU0",
    authDomain: "spiritly-ae536.firebaseapp.com",
    projectId: "spiritly-ae536",
    storageBucket: "spiritly-ae536.firebasestorage.app",
    messagingSenderId: "160769508942",
    appId: "1:160769508942:web:862821c14fa564babce51f",
    measurementId: "G-VMEC3LZKJ9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

// Use a single DOMContentLoaded listener for all your code
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!contactForm) {
    console.error('Contact form not found.');
    return;
  }

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
      console.log("Document successfully written with ID: ", kTexvpLoP0Cem5yYxi19);
      
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

 
});
