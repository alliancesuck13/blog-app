/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";

import "./Article.css";

export default function Article({
  isLoading,
  isLargerThan888,
  isUserAuthor,
  deleteAndEditButtons,
  gotError,
  avatar,
  tags,
  article,
  liked,
  likes,
  like,
}) {
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
        transform="translateY(100px)"
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
              className={liked ? "button--liked" : "button--unliked"}
              style={{ position: "absolute", top: "70px", right: "27px" }}
              onClick={like}
            >
              <span style={{ fontSize: "12px" }}>{likes}</span>
            </button>
            {isUserAuthor && deleteAndEditButtons}
          </>
        )}
      </Box>
    </article>
  );
}
