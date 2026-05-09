import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

app.use(express.json());
app.use(express.static('public'));

app.post('/api/generate', async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || '').trim();

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    if (!OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'Missing OPENAI_API_KEY environment variable.',
      });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'OpenAI request failed.',
      });
    }

    res.json({
      text: data.output_text || extractText(data) || '',
      model: OPENAI_MODEL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

function extractText(data) {
  return data.output
    ?.flatMap((item) => item.content || [])
    ?.filter((content) => content.type === 'output_text')
    ?.map((content) => content.text)
    ?.join('\n');
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
