import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateSearchResults(query: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Generate a detailed, factual response about: ${query}. Include:
    - A brief introduction
    - Key facts and characteristics
    - Scientific or technical details where relevant
    - Current status or significance
    Format with proper paragraphs and bullet points where appropriate.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('No response received from Gemini API');
    }
    
    return response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating search results:', error.message);
      throw new Error(`Failed to generate search results: ${error.message}`);
    } else {
      console.error('Error generating search results:', error);
      throw new Error('An unexpected error occurred while generating search results. Please try again.');
    }
  }
}