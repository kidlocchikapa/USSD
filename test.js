// Test USSD Service
// Service Code: *384*64007#
// Phone Number: +265990155300

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/ussd';

// Test data
const serviceCode = '*384*64007#';
const phoneNumber = '+265990155300';

// Function to send USSD request
async function sendUSSDRequest(text = '') {
    try {
        const response = await axios.post(BASE_URL, {
            serviceCode: serviceCode,
            phoneNumber: phoneNumber,
            text: text
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Test sequence
async function runTests() {
    console.log('=== USSD Service Test ===\n');
    console.log(`Service Code: ${serviceCode}`);
    console.log(`Phone Number: ${phoneNumber}\n`);

    // Step 1: Initial menu
    console.log('Step 1: Initial Menu');
    let response = await sendUSSDRequest('');
    console.log('Response:\n' + response + '\n');

    // Step 2: Check Balance
    console.log('Step 2: Check Balance (selecting option 1)');
    response = await sendUSSDRequest('1');
    console.log('Response:\n' + response + '\n');

    // Step 3: Buy Airtime - First step
    console.log('Step 3: Buy Airtime - Enter Amount');
    response = await sendUSSDRequest('2');
    console.log('Response:\n' + response + '\n');

    // Step 4: Buy Airtime - Complete
    console.log('Step 4: Buy Airtime - Confirm Amount (500)');
    response = await sendUSSDRequest('2*500');
    console.log('Response:\n' + response + '\n');

    // Step 5: Data Plans - First step
    console.log('Step 5: Data Plans Menu');
    response = await sendUSSDRequest('3');
    console.log('Response:\n' + response + '\n');

    // Step 6: Data Plans - Select plan
    console.log('Step 6: Select Data Plan (1GB - option 3)');
    response = await sendUSSDRequest('3*3');
    console.log('Response:\n' + response + '\n');
}

// Run tests
runTests();
