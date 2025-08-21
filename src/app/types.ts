// FILE: /src/app/types.ts
// ----------------------------------------------------------------
// This file defines the TypeScript types for the application.

export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}
