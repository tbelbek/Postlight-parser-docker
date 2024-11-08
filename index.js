const express = require('express');
const { parse } = require('@postlight/parser');

const app = express();
const port = 80;

// Middleware to log incoming requests and responses
app.use((req, res, next) => {
  const start = Date.now();
  
  // Capture the original end method
  const originalEnd = res.end;
  
  // Override the end method to log the response status code
  res.end = function (...args) {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    originalEnd.apply(this, args);
  };
  
  next();
});

app.get('/parser', async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).send({ error: 'URL is required' });
    }
  
    try {
      const result = await parse(url);
      if (result.content) {
        result.content += '<p style="font-size: smaller; font-style: italic;">Parsed by PP</p>';
      }
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
app.listen(port, '0.0.0.0', () => {
  console.log(`Parser API listening at http://0.0.0.0:${port}`);
});