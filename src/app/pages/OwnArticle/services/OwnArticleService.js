export default class OwnArticleService {
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

  deleteResource = async (url = "", token = "") => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (result.status === 422) {
      throw new Error("422");
    }

    if (!result.ok) {
      throw new Error(`Could not post ${url}, received ${result.status}`);
    }
  };

  getArticle(slug = "", token = "") {
    return this.getResource(`/articles/${slug}`, token)
      .then((response) => response)
      .catch((reason) => reason);
  }

  deleteArticle(slug = "", token = "") {
    return this.deleteResource(`/articles/${slug}`, token)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
