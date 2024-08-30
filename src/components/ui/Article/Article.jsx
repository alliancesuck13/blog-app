/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  Spinner,
  Tag,
  useMediaQuery,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from "markdown-to-jsx";

import generateUniqueID from "../../../utils/generateUniqueID";
import { loadArticle } from "../../../store/slicers/articleSlice";

import "./Article.css";
import ArticleService from "./services/ArticleService";

export default function Article() {
  const [isLoading, setIsLoading] = useState(true);
  const [gotError, setGotError] = useState(false);

  const dispatch = useDispatch();
  const article = useSelector((state) => {
    return state.article.article;
  });

  useEffect(() => {
    const service = new ArticleService();
    service
      .getArticle("markdown-primer-7ultpo")
      .then((response) => {
        dispatch(loadArticle({ article: response.article }));
        setIsLoading(false);
      })
      .catch(() => setGotError(true));
  }, []);

  const [isLargerThan888] = useMediaQuery("(min-width: 888px)");
  const avatar = isLargerThan888 ? (
    <Avatar name={article.author.username} src={article.author.image} />
  ) : null;

  const tags = article.tagList.map((tag) => (
    <Tag
      key={generateUniqueID()}
      mr="5px"
      mb="5px"
      backgroundColor="transparent"
      border="1px solid black"
      borderRadius="3px"
    >
      {tag}
    </Tag>
  ));

  return (
    <article>
      <Box
        mt="26px"
        mb="26px"
        padding="16px"
        backgroundColor="#fff"
        maxW="941px"
        ml="auto"
        mr="auto"
        boxShadow="0 4px 12px 0 #00000026"
        borderRadius="5px"
        position="relative"
      >
        {isLoading ? (
          <Flex>
            <Spinner size="lg" mr="auto" ml="auto" />
          </Flex>
        ) : gotError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>
              Maybe some troubles with server connection. Try to reload the page
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Flex>
              <h2
                style={{
                  fontSize: "20px",
                  color: "#1890FF",
                  maxWidth: "655px",
                }}
              >
                {article.title}
              </h2>
              <Box minWidth="141px" ml="auto">
                <Flex>
                  <Flex flexDirection="column" mr={isLargerThan888 ? "16px" : "48px"}>
                    <p
                      style={
                        isLargerThan888
                          ? {
                              fontSize: "18px",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }
                          : {
                              fontSize: "18px",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              transform: "translateX(50px)",
                            }
                      }
                    >
                      {article.author.username}
                    </p>
                    <p
                      style={
                        isLargerThan888
                          ? {
                              fontSize: "12px",
                              color: "#00000080",
                              textAlign: "end",
                            }
                          : {
                              fontSize: "12px",
                              color: "#00000080",
                              textAlign: "end",
                              transform: "translateX(48px)",
                            }
                      }
                    >
                      {format(new Date(article.createdAt), "PP")}
                    </p>
                  </Flex>
                  {avatar}
                </Flex>
              </Box>
            </Flex>
            <Box maxW="700px">
              {tags}
              <p style={{ fontSize: "12px", color: "#00000080" }}>
                {article.description}
              </p>
            </Box>
            <Box mt="50px" className="Box">
              <Markdown>{article.body}</Markdown>
            </Box>
            <button
              type="button"
              className="button"
              style={{ position: "absolute", top: "70px", right: "27px" }}
            >
              <span style={{ fontSize: "12px" }}>{article.favoritesCount}</span>
            </button>
          </>
        )}
      </Box>
    </article>
  );
}
