export default class UserService {
  API_BASE_URL = "https://blog.kata.academy/api";

  getResource = async (url = "") => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    const response = await result.json();

    return response;
  };

  getCurrentUser() {
    return this.getResource("/user")
      .then((response) => response)
      .catch((reason) => reason);
  }
}
