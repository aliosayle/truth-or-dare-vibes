import axios from 'axios';

async function testLogin() {
  try {
    console.log('Testing login API...');
    
    // Create user credentials
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('Sending login request with credentials:', credentials);
    
    // Make direct API call to the login endpoint
    const response = await axios.post('http://localhost:3001/api/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', {
      message: response.data.message,
      token: response.data.token ? '[TOKEN RECEIVED]' : '[NO TOKEN]',
      user: response.data.user
    });
    
  } catch (error: any) {
    console.error('Login test failed:');
    console.error('Status:', error.response?.status);
    console.error('Error message:', error.response?.data?.message || error.message);
    console.error('Full error response:', error.response?.data);
  }
}

// Run the test
testLogin(); 