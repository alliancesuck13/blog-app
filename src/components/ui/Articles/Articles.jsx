/* eslint-disable import/no-extraneous-dependencies */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

import ArticleMinimized from "../ArticleMinimized";
import { changePage, loadArticles } from "../../../store/slicers/articlesSlice";

import ArticlesService from "./services/ArticlesService";

export default function Articles() {
  document.title = "Kitt's blog";

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
    return (
      <ArticleMinimized
        key={article.slug}
        title={article.title}
        description={article.description}
        createdAt={article.createdAt}
        tagList={article.tagList}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        author={article.author}
        slug={article.slug}
      />
    );
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
    <Box mt="100px">
      {didWrong ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Maybe some troubles with server connection. Try to reload the page
          </AlertDescription>
        </Alert>
      ) : null}
      {isLoaded ? (
        <>
          {articlesMinimized}
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalPages * 2}
            align="center"
            showSizeChanger={false}
            style={{ marginBottom: "16px" }}
            onChange={onChangePage}
          />
        </>
      ) : (
        <Flex>
          <Spinner size="xl" ml="auto" mr="auto" mt="25px" mb="25px" />
        </Flex>
      )}
    </Box>
  );
}
