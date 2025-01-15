require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Spotify Token Endpoint
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Route to Get Access Token
app.get('/get-token', async (req, res) => {
  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64')}`,
    };

    const response = await axios.post(SPOTIFY_TOKEN_URL, params, { headers });
    res.json(response.data); // Send token data to the client
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    res.status(500).send('Failed to fetch access token');
  }
});

// Route to Fetch Artist Data
app.get('/artist/:id', async (req, res) => {
  const artistId = req.params.id;
  const accessToken = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!accessToken) {
    return res.status(400).send('Authorization token is missing');
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data); // Send artist data to the client
  } catch (error) {
    console.error('Error fetching artist data:', error.response?.data || error.message);
    res.status(500).send('Failed to fetch artist data');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
