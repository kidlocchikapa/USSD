const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USSD endpoint
app.post('/ussd', (req, res) => {
    const serviceCode = req.body.serviceCode;
    const phoneNumber = req.body.phoneNumber?.trim() || '';
    const text = req.body.text || '';
    
    let response = '';

    // Check if the text is empty to start a new session
    if (text === '') {
        response = 'CON Welcome to moyo wallet. Please choose an option:\n';
        response += '1. Check Balance\n';
        response += '2. Buy Airtime\n';
        response += '3. Data Plans\n';
    } else {
        // Split the text to get the user's response
        const textArray = text.split('*');

        switch (textArray[0]) {
            case '1':
                // Check balance
                response = 'END Your balance is KES 1,000.';
                break;

            case '2':
                // Buy airtime
                if (textArray.length === 1) {
                    response = 'CON Enter amount to buy airtime:';
                } else if (textArray.length === 2) {
                    const amount = textArray[1];
                    response = `END You have successfully bought KES ${amount} airtime.`;
                }
                break;

            case '3':
                // Data plans
                if (textArray.length === 1) {
                    response = 'CON Choose a data plan:\n';
                    response += '1. 100MB - KES 50\n';
                    response += '2. 500MB - KES 200\n';
                    response += '3. 1GB - KES 350\n';
                } else if (textArray.length === 2) {
                    const plan = textArray[1];
                    switch (plan) {
                        case '1':
                            response = 'END You have successfully purchased 100MB data plan.';
                            break;
                        case '2':
                            response = 'END You have successfully purchased 500MB data plan.';
                            break;
                        case '3':
                            response = 'END You have successfully purchased 1GB data plan.';
                            break;
                        default:
                            response = 'END Invalid option selected.';
                            break;
                    }
                }
                break;

            default:
                response = 'END Invalid option selected.';
                break;
        }
    }

    // Send the response
    res.send(response);
});

// Start the server
app.listen(port, () => {
    console.log(`USSD Server is running on port ${port}`);
});
