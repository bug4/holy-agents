import OpenAI from 'openai';

// Create a mock OpenAI client if no API key is provided
const createOpenAIClient = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    // Return a mock client that doesn't make real API calls
    return {
      chat: {
        completions: {
          create: async () => {
            throw new Error('OpenAI API key not configured. Please add REACT_APP_OPENAI_API_KEY to your .env file.');
          }
        }
      }
    };
  }
  
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
};

const openai = createOpenAIClient();

export default openai;