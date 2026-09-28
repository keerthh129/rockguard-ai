const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json() as Promise<T>
}

export async function getHealth(): Promise<{ status: string }> {
  return apiFetch<{ status: string }>('/api/health')
}