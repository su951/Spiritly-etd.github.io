// Import Firebase modules from CDN (works in GitHub-hosted pages)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
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
      // Save to Firestore
      await addDoc(collection(db, 'contactusp'), {
        ...formData,
        timestamp: serverTimestamp()
      });

      //  // Log event and show success
      logEvent(analytics, 'contact_form_submission');
      showMessage(formMessage, 'Thank you! Your message has been sent.', 'success');
      contactForm.reset();
      
  
       } catch (error) {
      console.error('Submission error:', error);
      showMessage(formMessage, 'Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });


  
  // Helper function for showing messages
  function showMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.style.color = type === 'error' ? 'red' : 'green';
    element.style.display = 'block';
  }
});
