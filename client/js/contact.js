// client/js/contact.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    
    // Pre-fill product from query param if coming from collection page
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
        document.getElementById('inquiryType').value = 'Custom design';
        document.getElementById('message').value = `I'm interested in: ${product}`;
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const inquiryType = document.getElementById('inquiryType').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !phone || !inquiryType || !message) {
            statusDiv.innerHTML = '<span style="color:red;">Please fill all required fields.</span>';
            return;
        }
        if (phone.length < 10 || isNaN(phone)) {
            statusDiv.innerHTML = '<span style="color:red;">Enter a valid 10-digit phone number.</span>';
            return;
        }
        if (email && !email.includes('@')) {
            statusDiv.innerHTML = '<span style="color:red;">Enter a valid email address.</span>';
            return;
        }
        
        statusDiv.innerHTML = 'Sending...';
        const payload = { name, phone, email, inquiryType, message };
        try {
            const result = await api.submitInquiry(payload);
            statusDiv.innerHTML = '<span style="color:green;">✅ Thank you! We will contact you soon.</span>';
            form.reset();
        } catch (error) {
            statusDiv.innerHTML = '<span style="color:red;">❌ Submission failed. Please call us directly.</span>';
        }
    });
});