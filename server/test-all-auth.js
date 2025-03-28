// Comprehensive auth testing script
const axios = require('axios');

const API_URL = 'http://161.97.177.233:3001/api';

const TEST_SCENARIOS = [
  {
    name: 'Login with email and password only',
    data: {
      email: 'admin@example.com',
      password: 'admin123'
    }
  },
  {
    name: 'Login with username and password only',
    data: {
      username: 'admin',
      password: 'admin123'
    }
  },
  {
    name: 'Login with both username and email',
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    }
  },
  {
    name: 'Login with test user',
    data: {
      username: 'test',
      email: 'test@example.com',
      password: 'test123'
    }
  },
  {
    name: 'Login missing password',
    data: {
      email: 'admin@example.com'
    },
    expectError: true
  },
  {
    name: 'Login missing both username and email',
    data: {
      password: 'admin123'
    },
    expectError: true
  }
];

async function testScenario(scenario) {
  console.log(`\n==== TESTING: ${scenario.name} ====`);
  console.log(`Sending request to: ${API_URL}/auth/login`);
  console.log('Request data:', JSON.stringify(scenario.data, null, 2));
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, scenario.data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('\nResponse Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
    if (scenario.expectError) {
      console.log('❌ Expected error but got success');
    } else {
      console.log('✅ Test passed!');
      
      if (response.data && response.data.token) {
        // Test protected endpoint
        console.log('\nTesting protected endpoint with token...');
        try {
          const meResponse = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${response.data.token}`
            }
          });
          
          console.log('Protected endpoint response:', JSON.stringify(meResponse.data, null, 2));
          console.log('✅ Protected endpoint access successful');
        } catch (err) {
          console.log('❌ Protected endpoint access failed:', err.message);
        }
      }
    }
  } catch (error) {
    console.log('\n== ERROR OCCURRED ==');
    
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
      
      if (scenario.expectError) {
        console.log('✅ Expected error received');
      } else {
        console.log('❌ Test failed: Unexpected error');
      }
    } else if (error.request) {
      console.log('❌ No response received from server');
    } else {
      console.log('❌ Error setting up request:', error.message);
    }
  }
}

async function runTests() {
  console.log('==== STARTING COMPREHENSIVE AUTH TESTS ====');
  console.log(`Testing against API: ${API_URL}`);
  console.log(`Total test scenarios: ${TEST_SCENARIOS.length}`);
  
  for (const scenario of TEST_SCENARIOS) {
    await testScenario(scenario);
  }
  
  console.log('\n==== AUTH TESTING COMPLETE ====');
}

runTests().catch(err => {
  console.error('Test runner error:', err);
}); 