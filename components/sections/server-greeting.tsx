async function getGreetingData() {
  // This could be a database call or API request
  // Server components can contain async code directly
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulating a delay
  return {
    greeting: "Hello from the server!",
    timestamp: new Date().toLocaleString(),
  };
}

export default async function ServerGreeting() {
  // Fetch data directly in the component
  const data = await getGreetingData();

  return (
    <div className="mb-6 rounded-lg border border-border bg-accent/30 p-6">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Hello Server!</h2>
      <p className="mb-2 text-foreground">{data.greeting}</p>
      <p className="text-sm text-muted-foreground">
        Generated at: {data.timestamp}
      </p>
      <div className="mt-3 rounded bg-muted p-2 text-xs text-muted-foreground">
        This component renders on the server and sends HTML to the client
      </div>
    </div>
  );
}
