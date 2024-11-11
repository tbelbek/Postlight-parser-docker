# Parser API

This is a simple API for parsing web pages using the `@postlight/parser` and `@mozilla/readability` libraries.

## Prerequisites

- Docker
- Node.js

## Getting Started

### Running the API with Docker

1. Build the Docker image:

    ```sh
    docker build -t postlight-readability-parser .
    ```

2. Run the Docker container:

    ```sh
    docker run -p 80:80 postlight-readability-parser
    ```

### Running the API Locally

1. Install dependencies:

    ```sh
    npm install
    ```

2. Start the server:

    ```sh
    node index.mjs
    ```

## API Endpoints

### GET /parser

Fetch and parse a URL using `@postlight/parser`.

#### Request

```sh
curl -X GET "http://localhost/parser?url=https://example.com"
```

#### Response

{
  "title": "Example Domain",
  "content": "<p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p><p style=\"font-size: smaller; font-style: italic;\">Parsed by PP</p>",
  "author": null,
  "date_published": null,
  "lead_image_url": null,
  "dek": null,
  "next_page_url": null,
  "url": "https://example.com",
  "domain": "example.com",
  "excerpt": "This domain is for use in illustrative examples in documents.",
  "word_count": 19,
  "direction": "ltr",
  "total_pages": 1,
  "rendered_pages": 1
}

### POST /

Fetch and parse a URL using @mozilla/readability.

```sh
curl -X POST "http://localhost/" -H "Content-Type: application/json" -d '{"url": "https://example.com"}'
```

#### Response

```
{
  "title": "Example Domain",
  "content": "<div>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</div><p style=\"font-size: smaller; font-style: italic;\">Parsed by PP</p>",
  "textContent": "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  "length": 123,
  "excerpt": "This domain is for use in illustrative examples in documents.",
  "byline": null,
  "dir": "ltr"
}
```

### Error Handling

If the URL is invalid or the page cannot be parsed, the API will return a 400 status code with an error message.

```
{
  "error": "Failed to fetch and parse the URL"
}
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```