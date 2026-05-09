# GPT JavaScript

A small JavaScript app that sends prompts to OpenAI using a Node.js backend.

## Why a backend?

Do not put your OpenAI API key in browser JavaScript. This project keeps the key on the server through the `OPENAI_API_KEY` environment variable.

## Requirements

- Node.js 20+
- OpenAI API key

## Install

```bash
npm install
```

## Run

```bash
OPENAI_API_KEY="your-api-key" npm run dev
```

Open:

```txt
http://localhost:3000
```

## Optional model override

```bash
OPENAI_MODEL="gpt-4.1-mini" OPENAI_API_KEY="your-api-key" npm start
```
