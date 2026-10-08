# AI Backend

Node.js backend untuk website `web-gw-nih.my.id`.

## Install

```bash
npm install
```

## Environment

Buat file `.env`:

```env
NARAYA_API_KEY=sk-nry-...
PORT=3000
```

Jangan upload file `.env` ke GitHub.

## Run

```bash
npm start
```

## API

### GET /

Health check.

### POST /chat

Request:

```json
{
  "message": "Hello!"
}
```

Response:

```json
{
  "reply": "..."
}
```

CORS hanya mengizinkan `https://web-gw-nih.my.id`.
