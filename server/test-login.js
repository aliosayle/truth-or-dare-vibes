// Test login process with detailed debugging
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3001/api';
const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'test123'
};

console.log('==== TESTING LOGIN PROCESS ====');
console.log(`Sending request to: ${API_URL}/auth/login`);
console.log('Request data:', JSON.stringify(TEST_CREDENTIALS, null, 2));

async function testLogin() {
  try {
    console.log('\n1. Attempting login with test user...');
    const response = await axios.post(`${API_URL}/auth/login`, TEST_CREDENTIALS, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('\nResponse Status:', response.status);
    console.log('Response Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.token) {
      console.log('\nLogin successful! Token received.');
      
      // Test protected endpoint
      console.log('\n2. Testing protected endpoint with token...');
      const meResponse = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${response.data.token}`
        }
      });
      
      console.log('Protected endpoint response:', JSON.stringify(meResponse.data, null, 2));
    }
  } catch (error) {
    console.log('\n== ERROR OCCURRED ==');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', JSON.stringify(error.response.headers, null, 2));
      console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
      
      // Let's also print the full request that was sent
      console.log('\nFull request that failed:');
      console.log('- URL:', error.config.url);
      console.log('- Method:', error.config.method.toUpperCase());
      console.log('- Headers:', JSON.stringify(error.config.headers, null, 2));
      console.log('- Data:', error.config.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from server');
      console.log(error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error setting up request:', error.message);
    }
  }
}

testLogin().then(() => {
  console.log('\nTest completed.');
}); 