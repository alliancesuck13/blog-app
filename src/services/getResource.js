const API_BASE_URL = "https://blog.kata.academy/api";

export default async function getResource(url = "") {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const result = await fetch(`${API_BASE_URL}${url}`, options);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, received ${result.status}`);
  }

  const response = await result.json();

  return response;
}
