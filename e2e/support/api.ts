import type { Page, Request } from "@playwright/test";

const SUPPORTERS_ROUTE = "**/supporters";

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "*",
};

export type MockedResponse = {
  status?: number;
  body?: unknown;
  /** Simulates a transport-level failure instead of an HTTP response. */
  abort?: boolean;
  delayMs?: number;
};

/**
 * Intercepts POST /supporters and returns the given responses in order, with
 * the last one repeating for any extra attempt. The returned array collects
 * every intercepted request so tests can assert on the payload.
 */
export async function mockSupportersApi(
  page: Page,
  responses: MockedResponse[] = [{ status: 201 }]
): Promise<Request[]> {
  const requests: Request[] = [];

  await page.route(SUPPORTERS_ROUTE, async route => {
    const request = route.request();

    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: CORS_HEADERS });
      return;
    }

    const response = responses[Math.min(requests.length, responses.length - 1)];

    requests.push(request);

    if (response.delayMs) {
      await new Promise(resolve => setTimeout(resolve, response.delayMs));
    }

    if (response.abort) {
      await route.abort("failed");
      return;
    }

    await route.fulfill({
      status: response.status ?? 201,
      headers: { ...CORS_HEADERS, "content-type": "application/json" },
      body: JSON.stringify(response.body ?? { ok: true }),
    });
  });

  return requests;
}

/**
 * Safety net so a test that forgets to mock the API can never reach the real
 * backend. Registered before any test route, which therefore takes precedence.
 */
export async function blockExternalRequests(page: Page, baseURL: string) {
  const allowedOrigin = new URL(baseURL).origin;

  await page.route("**/*", async route => {
    const url = route.request().url();

    if (url.startsWith(allowedOrigin) || url.startsWith("data:")) {
      await route.fallback();
      return;
    }

    await route.abort("blockedbyclient");
  });
}

export type MultipartFile = {
  filename: string;
  contentType: string;
};

export type MultipartPayload = {
  fields: Record<string, string>;
  files: Record<string, MultipartFile>;
};

/**
 * Minimal multipart/form-data reader for assertions. Binary parts are only
 * inspected through their headers, since postData() decodes the body as UTF-8.
 */
export function parseMultipartBody(request: Request): MultipartPayload {
  const body = request.postData() ?? "";
  const boundary = body.slice(0, body.indexOf("\r\n"));
  const payload: MultipartPayload = { fields: {}, files: {} };

  if (!boundary) return payload;

  for (const part of body.split(boundary)) {
    const headersEnd = part.indexOf("\r\n\r\n");

    if (headersEnd === -1) continue;

    const headers = part.slice(0, headersEnd);
    const name = headers.match(/name="([^"]*)"/)?.[1];

    if (!name) continue;

    const filename = headers.match(/filename="([^"]*)"/)?.[1];

    if (filename === undefined) {
      payload.fields[name] = part.slice(headersEnd + 4).replace(/\r\n$/, "");
      continue;
    }

    payload.files[name] = {
      filename,
      contentType: headers.match(/Content-Type:\s*([^\r\n]+)/i)?.[1] ?? "",
    };
  }

  return payload;
}
