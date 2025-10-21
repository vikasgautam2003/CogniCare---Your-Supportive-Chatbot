// import { Pinecone } from '@pinecone-database/pinecone';
// import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { PineconeStore } from "@langchain/pinecone";
// import 'dotenv/config';

// const MENTAL_HEALTH_URLS = [
//   'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
//   'https://www.who.int/news-room/fact-sheets/detail/depression',
//   'https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm',
//   'https://www.mentalhealth.gov/basics/what-is-mental-health',
//   'https://www.mayoclinic.org/diseases-conditions/mental-illness/symptoms-causes/syc-20374968',
//   'https://www.psychologytoday.com/us/basics/mental-health',
//   'https://www.medicalnewstoday.com/articles/154543',
//   'https://www.cdc.gov/mentalhealth/learn/index.htm',
//   'https://www.apa.org/topics/mental-health',
//   'https://www.nami.org/About-Mental-Illness'
// ];


// const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 200,
// });

// async function main() {
//   try {
//     if (!process.env.PINECONE_API_KEY || !process.env.GEMINI_API_KEY) {
//       throw new Error("Missing Pinecone or Gemini API key in .env file.");
//     }

//     const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
//     const pineconeIndex = pinecone.index('cognicare');
//     const loaders = MENTAL_HEALTH_URLS.map(url => new CheerioWebBaseLoader(url));
//     const allDocs = [];
//     for (const loader of loaders) {
//       try {
//         const docs = await loader.load();
//         allDocs.push(...docs);
//       } catch (e) {
//         console.warn(`Could not scrape ${loader.webPath}: ${(e as Error).message}`);
//       }
//     }
//     if (allDocs.length === 0) return;
//     const splits = await textSplitter.splitDocuments(allDocs);
//     const embeddings = new GoogleGenerativeAIEmbeddings({ model: "text-embedding-004" });
//     await PineconeStore.fromDocuments(splits, embeddings, { pineconeIndex });
//     console.log("Ingestion complete");
//   } catch (error) {
//     console.error("Error during ingestion:", error);
//   }
// }

// main();

















// scripts/ingest.js
const { Pinecone } = require('@pinecone-database/pinecone');
const { CheerioWebBaseLoader } = require('@langchain/community/document_loaders/web/cheerio');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { PineconeStore } = require('@langchain/pinecone');
require('dotenv').config();

const MENTAL_HEALTH_URLS = [
  'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
  'https://www.who.int/news-room/fact-sheets/detail/depression',
  'https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm',
  'https://www.mentalhealth.gov/basics/what-is-mental-health',
  'https://www.mayoclinic.org/diseases-conditions/mental-illness/symptoms-causes/syc-20374968',
  'https://www.psychologytoday.com/us/basics/mental-health',
  'https://www.medicalnewstoday.com/articles/154543',
  'https://www.cdc.gov/mentalhealth/learn/index.htm',
  'https://www.apa.org/topics/mental-health',
  'https://www.nami.org/About-Mental-Illness'
];

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

async function main() {
  try {
    if (!process.env.PINECONE_API_KEY || !process.env.GEMINI_API_KEY) {
      throw new Error("Missing Pinecone or Gemini API key in .env file.");
    }

    console.log("Initializing Pinecone client...");
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const pineconeIndex = pinecone.index('cognicare');

    console.log("Creating web loaders...");
    const loaders = MENTAL_HEALTH_URLS.map(url => new CheerioWebBaseLoader(url));

    const allDocs = [];
    for (const loader of loaders) {
      try {
        console.log(`Loading documents from: ${loader.webPath}`);
        const docs = await loader.load();
        allDocs.push(...docs);
        console.log(`Loaded ${docs.length} documents from ${loader.webPath}`);
      } catch (e) {
        console.warn(`Could not scrape ${loader.webPath}: ${e.message}`);
      }
    }

    if (allDocs.length === 0) {
      console.log("No documents loaded. Exiting...");
      return;
    }

    console.log(`Splitting ${allDocs.length} documents into chunks...`);
    const splits = await textSplitter.splitDocuments(allDocs);

    console.log(`Creating embeddings for ${splits.length} chunks...`);
    const embeddings = new GoogleGenerativeAIEmbeddings({ model: "text-embedding-004", apiKey: process.env.GEMINI_API_KEY });

    console.log("Upserting documents into Pinecone index...");
    await PineconeStore.fromDocuments(splits, embeddings, { pineconeIndex });

    console.log("Ingestion complete!");
  } catch (error) {
    console.error("Error during ingestion:", error);
  }
}

main();
