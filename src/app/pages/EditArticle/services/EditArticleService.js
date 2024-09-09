export default class EditArticleService {
  API_BASE_URL = "https://blog.kata.academy/api";

  putResource = async (url = "", body = null, token = "") => {
    const options = {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
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

  editArticle(body = {}, slug = "", token = "") {
    return this.putResource(`/articles/${slug}`, body, token)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
