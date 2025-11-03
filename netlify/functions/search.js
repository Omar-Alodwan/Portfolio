// Netlify serverless function to proxy Gemini API requests
// This keeps your API key secure on the server

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { query, cvText, contextText } = JSON.parse(event.body);
    
    // Your API key stored securely in Netlify environment variables
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Build the context
    const cvSection = cvText ? `CV Content:\n${cvText}\n` : '';
    const contextSection = contextText ? `Additional Context:\n${contextText}\n` : '';
    
    const context = `You are an AI assistant helping to answer questions about Omar Alodwan's CV and experience. 
Use ONLY the information provided below from the CV and additional context. Do not use any information outside of what is provided.

${cvSection}${contextSection}Please answer the following question using ONLY the information above: ${query}`;

    // Make request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

