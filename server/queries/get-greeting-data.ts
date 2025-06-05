"use server";

export async function getGreetingData() {
  // This could be a database call or API request
  // Server components can contain async code directly
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating a delay
  return {
    greeting: "Hello from the server!",
    timestamp: new Date().toLocaleString(),
  };
}
