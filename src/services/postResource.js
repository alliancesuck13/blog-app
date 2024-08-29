const API_BASE_URL = "https://blog.kata.academy/api";

export default async function postResource(url = "", body = null) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  };

  const result = await fetch(`${API_BASE_URL}${url}`, options);

  if (!result.ok) {
    throw new Error(`Could not post ${url}, received ${result.status}`);
  }

  const response = await result.json();

  return response;
}
