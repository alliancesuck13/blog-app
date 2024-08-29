export default class ArticlesService {
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

  getArticles() {
    return this.getResource("/articles")
      .then((response) => response)
      .catch((reason) => reason);
  }

  changePage(page) {
    return this.getResource(`/articles?offset=${page}`)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
