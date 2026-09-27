const BASE = "/api/v1"

type RequestOptions = {
  method?: string
  body?: unknown
  signal?: AbortSignal
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
  })

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}))
    throw new ApiError(res.status, payload?.error ?? { code: "UNKNOWN", message: res.statusText })
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  readonly status: number
  readonly error: { code: string; message: string; fields?: Record<string, string> }

  constructor(
    status: number,
    error: { code: string; message: string; fields?: Record<string, string> }
  ) {
    super(error.message)
    this.name = "ApiError"
    this.status = status
    this.error = error
  }
}

export const api = {
  get:    <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal }),
  post:   <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body }),
  patch:  <T>(path: string, body: unknown) => request<T>(path, { method: "PATCH", body }),
  put:    <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
}
