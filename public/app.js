const form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#prompt');
const button = document.querySelector('#generate');
const output = document.querySelector('#output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();

  if (!prompt) {
    output.textContent = 'Please enter a prompt.';
    return;
  }

  setLoading(true);
  output.textContent = 'Generating...';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed.');
    }

    output.textContent = data.text || 'No text returned.';
  } catch (error) {
    output.textContent = error.message;
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Generating...' : 'Generate';
}
