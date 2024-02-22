import type { PathParams, RequestHandler } from "msw";
import { http, HttpResponse } from "msw";
import type { HttpRequestResolverExtras } from "msw/lib/core/handlers/HttpHandler";
import type { ResponseResolverInfo } from "msw/lib/core/handlers/RequestHandler";

function getMockedResponse({ request }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>>): HttpResponse {
  return HttpResponse.json({ message: `Mocked ${request.method} response from ${request.url} by MSW` });
}

const MSW_HANDLERS: RequestHandler[] = [
  http.get(/.+/u, getMockedResponse),
  http.post(/.+/u, getMockedResponse),
  http.patch(/.+/u, getMockedResponse),
  http.delete(/.+/u, getMockedResponse),
];

export { MSW_HANDLERS };