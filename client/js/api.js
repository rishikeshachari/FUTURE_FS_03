// client/js/api.js (enhanced)
class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        const config = {
            ...options,
            headers: { ...defaultHeaders, ...options.headers }
        };
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            // Throw a user-friendly error
            throw new Error(error.message || 'Network error. Please check your connection.');
        }
    }

    async getCurrentGoldRate() {
        try {
            return await this.request('/gold-rate/current');
        } catch (error) {
            console.warn('Using mock gold rate data');
            // Return mock data as fallback
            return { rate: 6750, perGram: true, date: new Date().toISOString().split('T')[0] };
        }
    }
    
    async getAllJewellery() {
        try {
            return await this.request('/jewelry/all');
        } catch (error) {
            console.warn('Using mock jewellery data');
            // Mock data will be handled by collection.js
            throw error;
        }
    }
    
    async submitInquiry(formData) {
        return await this.request('/inquiries/submit', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }
}