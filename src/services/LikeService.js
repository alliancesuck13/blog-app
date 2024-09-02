export default class LikeService {
  API_BASE_URL = "https://blog.kata.academy/api";

  postResource = async (url = "", token = "") => {
    const options = {
      method: "POST",
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

    const response = await result.json();

    return response;
  };

  like(slug = "", token = "") {
    return this.postResource(`/articles/${slug}/favorite`, token)
      .then((response) => response)
      .catch((reason) => reason);
  }

  unlike(slug = "", token = "") {
    return this.deleteResource(`/articles/${slug}/favorite`, token)
      .then((response) => response)
      .catch((reason) => reason);
  }
}
