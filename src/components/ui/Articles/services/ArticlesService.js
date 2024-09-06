export default class ArticlesService {
  API_BASE_URL = "https://blog.kata.academy/api";

  getResource = async (url = "", token = "") => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    const response = await result.json();

    return response;
  };

  getArticles(token = "") {
    return this.getResource("/articles", token)
      .then((response) => response)
      .catch((reason) => reason);
  }

  changePage(page, token = "") {
    return this.getResource(`/articles?offset=${page * 10}`, token)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
