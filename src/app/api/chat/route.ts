








// "use server";

// import { NextResponse } from 'next/server';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { PineconeStore } from "@langchain/pinecone";
// import { RunnableSequence } from '@langchain/core/runnables';
// import { StringOutputParser } from '@langchain/core/output_parsers';
// import { PromptTemplate } from '@langchain/core/prompts';
// import { HumanMessage, AIMessage } from '@langchain/core/messages';
// import 'dotenv/config';

// if (!process.env.PINECONE_API_KEY || !process.env.GEMINI_API_KEY) {
//   throw new Error("Missing Pinecone or Gemini API key in environment variables.");
// }

// const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const pineconeIndex = pinecone.index('cognicare');

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.0-flash",
//   maxOutputTokens: 2048,
//   temperature: 0.7,
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const embeddings = new GoogleGenerativeAIEmbeddings({
//   model: "text-embedding-004",
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const SYSTEM_TEMPLATE = `You are CogniCare, a supportive and empathetic AI assistant for mental well-being.
// Your primary role is to provide helpful information based *strictly* on the context provided.
// If the context does not contain the answer to the question, state that you don't have enough information on that topic.
// NEVER answer a question if the information is not in the context.

// **CRITICAL SAFETY INSTRUCTIONS:**
// - Do NOT provide medical advice, diagnosis, or treatment plans.
// - If the user expresses thoughts of self-harm, suicide, or crisis, your ONLY response must be: "It sounds like you are going through a difficult time. Please reach out for immediate help. You can contact the National Suicide Prevention Lifeline by calling or texting 988 in the US and Canada."

// CONTEXT:
// ---
// {context}
// ---
// CHAT HISTORY:
// {chat_history}
// ---
// USER QUESTION:
// {question}

// Answer:
// `;

// const questionPrompt = PromptTemplate.fromTemplate(SYSTEM_TEMPLATE);

// function formatDocumentsAsString(docs: Array<{ pageContent?: string }>) {
//   return docs.map(doc => doc.pageContent || '').join('\n');
// }

// type RAGInput = {
//   question: string;
//   chat_history: string;
//   context: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as { history?: any[] };
//     const history = Array.isArray(body.history) ? body.history : [];

//     if (history.length === 0) {
//       return NextResponse.json({ error: "Invalid or empty chat history provided." }, { status: 400 });
//     }

//     const lastUserMessage = history[history.length - 1];
//     const question =
//       lastUserMessage &&
//       Array.isArray(lastUserMessage.parts) &&
//       typeof lastUserMessage.parts[0]?.text === 'string'
//         ? lastUserMessage.parts[0].text
//         : null;

//     if (!question || lastUserMessage.role !== 'user') {
//       return NextResponse.json({ error: "Last message must be from the user and contain text." }, { status: 400 });
//     }

//     const chatHistory = history.slice(0, -1);
//     const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });
//     const docs = await vectorStore.similaritySearch(question, 5);
//     const context = formatDocumentsAsString(docs);

//     const formattedChatHistory = chatHistory
//       .map(msg =>
//         msg.role === 'user' && typeof msg.parts[0]?.text === 'string'
//           ? new HumanMessage(msg.parts[0].text)
//           : new AIMessage(msg.parts[0]?.text ?? '')
//       )
//       .join('\n');

//     const chain = RunnableSequence.from<RAGInput, string>([
//       async (input) => ({ context: input.context, question: input.question, chat_history: input.chat_history }),
//       questionPrompt,
//       model,
//       new StringOutputParser(),
//     ]);

//     const result = await chain.invoke({
//       question,
//       chat_history: formattedChatHistory,
//       context,
//     });

//     return NextResponse.json({ response: result });

//   } catch (error: unknown) {
//     console.error("RAG API Error:", error);
//     const message = error instanceof Error ? error.message : String(error);
//     return NextResponse.json({ error: `Failed to fetch response from API: ${message}` }, { status: 500 });
//   }
// }











"use server";

import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import 'dotenv/config';

if (!process.env.PINECONE_API_KEY || !process.env.GEMINI_API_KEY) {
  throw new Error("Missing Pinecone or Gemini API key in environment variables.");
}

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pinecone.index('cognicare');

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  maxOutputTokens: 2048,
  temperature: 0.7,
  apiKey: process.env.GEMINI_API_KEY,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_TEMPLATE = `You are CogniCare, a supportive and empathetic AI assistant for mental well-being.
Your primary role is to provide helpful information based *strictly* on the context provided.
If the context does not contain the answer to the question, state that you don't have enough information on that topic.
NEVER answer a question if the information is not in the context.

**CRITICAL SAFETY INSTRUCTIONS:**
- Do NOT provide medical advice, diagnosis, or treatment plans.
- If the user expresses thoughts of self-harm, suicide, or crisis, your ONLY response must be: "It sounds like you are going through a difficult time. Please reach out for immediate help. You can contact the National Suicide Prevention Lifeline by calling or texting 988 in the US and Canada."

CONTEXT:
---
{context}
---
CHAT HISTORY:
{chat_history}
---
USER QUESTION:
{question}

Answer:
`;

const questionPrompt = PromptTemplate.fromTemplate(SYSTEM_TEMPLATE);

function formatDocumentsAsString(docs: Array<{ pageContent?: string }>) {
  return docs.map(doc => doc.pageContent || '').join('\n');
}

type RAGInput = {
  question: string;
  chat_history: string;
  context: string;
};

export async function POST(req: Request) {
  try {
    console.log("Parsing request body...");
    const body = (await req.json()) as { history?: any[] };
    const history = Array.isArray(body.history) ? body.history : [];

    if (history.length === 0) {
      console.log("Empty chat history received.");
      return NextResponse.json({ error: "Invalid or empty chat history provided." }, { status: 400 });
    }

    const lastUserMessage = history[history.length - 1];
    const question =
      lastUserMessage &&
      Array.isArray(lastUserMessage.parts) &&
      typeof lastUserMessage.parts[0]?.text === 'string'
        ? lastUserMessage.parts[0].text
        : null;

    if (!question || lastUserMessage.role !== 'user') {
      console.log("Invalid last message or not from user.");
      return NextResponse.json({ error: "Last message must be from the user and contain text." }, { status: 400 });
    }

    console.log("Loading vector store from Pinecone...");
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });

    console.log("Performing similarity search...");
    const docs = await vectorStore.similaritySearch(question, 5);
    const context = formatDocumentsAsString(docs);
    console.log("Retrieved documents for context:");
    console.log(context || "(No documents retrieved)");

    const chatHistory = history.slice(0, -1); 

    const formattedChatHistory = chatHistory
      .map(msg =>
        msg.role === 'user' && typeof msg.parts[0]?.text === 'string'
          ? new HumanMessage(msg.parts[0].text)
          : new AIMessage(msg.parts[0]?.text ?? '')
      )
      .join('\n');

    console.log("Creating RAG chain...");
    const chain = RunnableSequence.from<RAGInput, string>([
      async (input) => {
        console.log("Step 1: Returning input for PromptTemplate...");
        return { context: input.context, question: input.question, chat_history: input.chat_history };
      },
      questionPrompt,
      model,
      new StringOutputParser(),
    ]);

    console.log("Invoking RAG chain...");
    const result = await chain.invoke({
      question,
      chat_history: formattedChatHistory,
      context,
    });

    console.log("RAG chain result received:");
    console.log(result);

    const sourceUsed = context ? "RAG documents" : "Generic model answer";
    console.log(`Answer derived from: ${sourceUsed}`);

    return NextResponse.json({ response: result, source: sourceUsed });

  } catch (error: unknown) {
    console.error("RAG API Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to fetch response from API: ${message}` }, { status: 500 });
  }
}
