export async function makeRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body: object = {},
  urlArgs: Record<string, string> = {}
) {
  const urlParams = new URLSearchParams(urlArgs);

  const res = await fetch(`${url}?${urlParams.toString()}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    status: res.status,
    statusText: res.statusText,
    body: await res.clone().json(),
  };
}
