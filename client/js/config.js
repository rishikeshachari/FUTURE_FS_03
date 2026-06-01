// client/js/config.js
// Central configuration for the entire frontend
const CONFIG = {
    // API base URL – change to your deployed backend later
    API_BASE_URL: 'http://localhost:5000/api',
    
    // Shop contact information (used across pages)
    SHOP: {
        name: 'Rishikesh Achari Jewellery',
        phone: '+91-xxxxx-xxx46',
        whatsapp: '+91-xxxxx-xxx46',  // same number for WhatsApp
        email: 'rishikesh@jewellery.com',
        address: 'Maldar St, Backside of SBI, Old Town, Anantapur, Andhra Pradesh - 515001',
        hours: {
            weekdays: '9:00 AM - 2:00 PM, 4:00 PM - 9:00 PM',
            sunday: '9:00 AM - 2:30 PM'
        },
        established: 2014,
        tagline: 'Tradition Meets Trust Since 2014'
    },
    
    // EMI partner banks
    emiBanks: ['HDFC', 'ICICI', 'SBI', 'Bajaj Finserv'],
    
    // Gold rate refresh interval (milliseconds)
    goldRateRefreshInterval: 60000  // 1 minute
};