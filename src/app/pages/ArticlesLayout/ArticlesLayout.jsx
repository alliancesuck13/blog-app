import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePage, loadArticles } from "../../../store/slicers/articlesSlice";
import ArticleMinimizedLayout from "../ArticleMinimizedLayout";
import Articles from "../../../components/ui/Articles/Articles";

import ArticlesService from "./services/ArticlesService";

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
  }, []);

  const articlesMinimized = articles.map((article) => {
    return <ArticleMinimizedLayout key={article.slug} article={article} />;
  });

  const onChangePage = (page) => {
    setIsLoaded(false);
    setCurrentPage(page);
    service
      .changePage(page, token)
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
      articlesMinimized={articlesMinimized}
      onChangePage={onChangePage}
    />
  );
}
