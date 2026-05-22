import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { AI_SYSTEM_PROMPT } from '@/constants/ai-prompt';

const groq = createGroq({
  apiKey: process.env.GROQ_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: AI_SYSTEM_PROMPT,
      messages,
    });

    return new Response(result.textStream, {
      headers: { 'Content-Type': 'text/event-stream' }
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
