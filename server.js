require('dotenv').config();
const express = require('express');

const app = express();
const PORT = 3000;

//Test Environment Variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log('Client ID:', clientId); //For testing only, remove in production
console.log('Client Secret:', clientSecret); //For testing only, remove in production

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
