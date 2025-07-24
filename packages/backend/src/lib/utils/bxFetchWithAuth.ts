export async function fetchWithAuth({
  options: { headers, ...options } = {},
  params,
  url,
}: {
  options?: RequestInit;
  params?: Record<string, string>;
  url: string;
}): Promise<unknown> {
  const urlObj = new URL(url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
  }

  const response = await fetch(urlObj.toString(), {
    ...options,
    headers: {
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<unknown>;
}
