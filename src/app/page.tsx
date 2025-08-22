

import Home from "./components/Home";

export default async function Page() {
  // Artificial delay to show loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <Home />;
}

