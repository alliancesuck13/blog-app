export default class SignInService {
  API_BASE_URL = "https://blog.kata.academy/api";

  postResource = async (url = "", body = null) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (result.status === 422) {
      throw new Error("422");
    }

    if (!result.ok) {
      throw new Error(`Could not post ${url}, received ${result.status}`);
    }

    const response = await result.json();

    return response;
  };

  signIn(body = {}) {
    return this.postResource("/users/login", body)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
