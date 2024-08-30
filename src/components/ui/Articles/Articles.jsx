/* eslint-disable import/no-extraneous-dependencies */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

import ArticleMinimized from "../ArticleMinimized";
import { changePage, loadArticles } from "../../../store/slicers/articlesSlice";
import generateUniqueID from "../../../utils/generateUniqueID";

import ArticlesService from "./services/ArticlesService";

export default function Articles() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [didWrong, setDidWrong] = useState(false);

  const dispatch = useDispatch();

  const articles = useSelector((state) => {
    return state.articles.articles;
  });

  const service = new ArticlesService();

  useEffect(() => {
    service
      .getArticles()
      .then((response) => {
        dispatch(loadArticles({ articles: response.articles }));
        setIsLoaded(true);
        setTotalPages(response.articlesCount);
      })
      .catch(() => {
        setIsLoaded(true);
        setDidWrong(true);
      });
  }, [dispatch]);

  const articlesMinimized = articles.map((article) => {
    return (
      <ArticleMinimized
        key={generateUniqueID()}
        title={article.title}
        description={article.description}
        createdAt={article.createdAt}
        tagList={article.tagList}
        favoritesCount={article.favoritesCount}
        author={article.author}
      />
    );
  });

  const onChangePage = (page) => {
    setIsLoaded(false);
    setCurrentPage(page);
    service
      .changePage(page)
      .then((response) => {
        dispatch(changePage({ newArticles: response.articles }));
        setIsLoaded(true);
      })
      .catch(() => setDidWrong(true));
  };

  return (
    <>
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
            total={totalPages * 20 - 20}
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
    </>
  );
}
