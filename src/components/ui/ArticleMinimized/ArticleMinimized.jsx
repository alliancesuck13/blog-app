import { Avatar, Box, useMediaQuery, Flex, Tag, Link } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ArticleMinimized.css";
import generateUniqueID from "../../../utils/generateUniqueID";

export default function ArticleMinimized({
  title,
  description,
  createdAt,
  tagList,
  favoritesCount,
  author,
  slug,
}) {
  const { username } = useSelector((state) => state.user);
  const [isLargerThan888] = useMediaQuery("(min-width: 888px)");
  const avatar = isLargerThan888 ? (
    <Avatar name={author.username} src={author.image} />
  ) : null;
  const tags = tagList.map((tag) => (
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
              author.username === username
                ? `/articles/${username}/${slug}`
                : `/articles/${slug}`
            }
          >
            <h2
              style={{
                fontSize: "20px",
                color: "#1890FF",
                maxWidth: "655px",
              }}
            >
              {title}
            </h2>
          </Link>
          <Box
            minWidth="141px"
            ml="auto"
            transform={isLargerThan888 ? "" : "translate(55px)"}
          >
            <Flex>
              <Flex flexDirection="column" mr="12px">
                <p style={{ fontSize: "18px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {author.username}
                </p>
                <p style={{ fontSize: "12px", color: "#00000080", textAlign: "end" }}>
                  {format(new Date(createdAt), "PP")}
                </p>
              </Flex>
              {avatar}
            </Flex>
          </Box>
        </Flex>
        <Box maxW="700px">
          {tags}
          <p>{description}</p>
        </Box>
        <button
          type="button"
          className="button"
          style={{ position: "absolute", bottom: "15px", right: "16px" }}
        >
          <span style={{ fontSize: "12px" }}>{favoritesCount}</span>
        </button>
      </Box>
    </article>
  );
}
