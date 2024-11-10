import express from 'express';
import pkg from '@postlight/parser';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const { parse } = pkg;

const app = express();
const port = 80;

app.use(express.json()); // Add this line to parse JSON bodies

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

app.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    res.send(article);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch and parse the URL' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Parser API listening at http://0.0.0.0:${port}`);
});