const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');  // Make sure CORS is imported
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/api/instagram', async (req, res) => {
    const accessToken = process.env.INSTAGRAM_TOKEN; // Ensure this is set in your .env file
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink`;
    console.log(`accessToken : ${accessToken}`)
    try {
        // Set the Authorization header to use Bearer token
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}` // Use Bearer token in the header
            },
        });

        const result = await response.json();

        // Log the full response for debugging
        console.log('Fetched data from Instagram API:', result);

        // Check if the response has an error
        if (response.ok) { // Check if the response status is OK (2xx)
            return res.json(result.data || []); // Return the data or an empty array if no data
        } else {
            console.error('Error from Instagram API:', result.error);
            return res.status(response.status).json({ error: result.error.message || 'Unknown error occurred' });
        }
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return res.status(500).json({ error: 'Internal Server Error: Failed to parse response' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
