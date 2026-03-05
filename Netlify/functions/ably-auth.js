// netlify/functions/ably-auth.js
const Ably = require('ably');

exports.handler = async function (event, context) {
  try {
    const apiKey = process.env.ABLY_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: 'Missing ABLY_API_KEY' };
    }

    const client = new Ably.Rest(apiKey);

    // Ably helper: creates a tokenRequest for the browser
    const tokenRequest = await new Promise((resolve, reject) => {
      client.auth.createTokenRequest({ clientId: 'you-ai-scene' }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenRequest),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: 'Error creating Ably token' };
  }
};
