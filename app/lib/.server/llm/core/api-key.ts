export function getAPIKey(env: Env): string {
  const apiKey = env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  return apiKey;
} 