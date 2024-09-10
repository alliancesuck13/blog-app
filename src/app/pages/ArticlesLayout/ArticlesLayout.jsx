import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePage, loadArticles } from "../../../store/slicers/articlesSlice";
import ArticleLayoutE from "../ArticleLayout";
import Articles from "../../../components/ui/Articles/Articles";

import ArticlesService from "./services/ArticlesService";

// eslint-disable-next-line no-underscore-dangle
export default function ArticlesLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [didWrong, setDidWrong] = useState(false);

  const dispatch = useDispatch();

  const articles = useSelector((state) => {
    return state.articles.articles;
  });

  const { token } = useSelector((state) => state.user);

  const service = new ArticlesService();

  useEffect(() => {
    document.title = "Kitt's blog";

    service
      .getArticles(token)
      .then((response) => {
        dispatch(loadArticles({ articles: response.articles }));
        setIsLoaded(true);
        setTotalPages(response.articlesCount);
      })
      .catch(() => {
        setIsLoaded(true);
        setDidWrong(true);
      });
  }, [dispatch, token]);

  const articleList = articles.map((article) => {
    return <ArticleLayoutE key={article.slug} article={article} />;
  });

  const onChangePage = (page) => {
    const changedPage = page === 1 ? 0 : page * 10;
    setIsLoaded(false);
    setCurrentPage(page);
    service
      .changePage(changedPage, token)
      .then((response) => {
        dispatch(changePage({ newArticles: response.articles }));
        setIsLoaded(true);
      })
      .catch(() => setDidWrong(true));
  };

  return (
    <Articles
      isLoaded={isLoaded}
      totalPages={totalPages}
      currentPage={currentPage}
      didWrong={didWrong}
      articles={articleList}
      onChangePage={onChangePage}
    />
  );
}
