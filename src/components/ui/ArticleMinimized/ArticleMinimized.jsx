import { Box, Flex, Link } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";

import "./ArticleMinimized.css";

export default function ArticleMinimized({
  article,
  username,
  liked,
  likes,
  like,
  avatar,
  tags,
}) {
  return (
    <article>
      <Box
        mt="26px"
        mb="26px"
        padding="16px"
        backgroundColor="#fff"
        maxW="941px"
        minHeight="140px"
        ml="auto"
        mr="auto"
        boxShadow="0 4px 12px 0 #00000026"
        borderRadius="5px"
        position="relative"
      >
        <Flex>
          <Link
            as={RouterLink}
            to={
              article.author.username === username
                ? `/articles/${username}/${article.slug}`
                : `/articles/${article.slug}`
            }
          >
            <h2
              style={{
                fontSize: "20px",
                color: "#1890FF",
                maxWidth: "655px",
              }}
            >
              {article.title}
            </h2>
          </Link>
          <Box ml="auto">
            <Flex>
              <Flex flexDirection="column" mr="12px">
                <p style={{ fontSize: "18px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {article.author.username}
                </p>
                <p style={{ fontSize: "12px", color: "#00000080", textAlign: "end" }}>
                  {format(new Date(article.createdAt), "PP")}
                </p>
              </Flex>
              {avatar}
            </Flex>
          </Box>
        </Flex>
        <Box maxW="700px">
          {tags}
          <p>{article.description}</p>
        </Box>
        <button
          type="button"
          className={liked ? "button--liked" : "button--unliked"}
          style={{ position: "absolute", bottom: "15px", right: "16px" }}
          onClick={like}
        >
          <span style={{ fontSize: "12px" }}>{likes}</span>
        </button>
      </Box>
    </article>
  );
}
