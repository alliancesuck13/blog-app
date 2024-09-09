import { Avatar, Box, useMediaQuery, Flex, Tag, Link, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./ArticleMinimized.css";
import generateUniqueID from "../../../utils/generateUniqueID";
import LikeService from "../../../services/LikeService";
import { likeArticle, unlikeArticle } from "../../../store/slicers/articlesSlice";
import cutTag from "../../../utils/cutTag";

export default function ArticleMinimized({ article }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const { token, username, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    article.favorited ? setLiked(true) : setLiked(false);
    !loggedIn && setLiked(false);

    setLikes(article.favoritesCount);
  }, []);

  const toast = useToast();

  const navigate = useNavigate();

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
      {cutTag(tag)}
    </Tag>
  ));

  const like = () => {
    const service = new LikeService();
    if (!loggedIn) {
      setTimeout(() => navigate("/sign-in"), 1000);
      toast({
        title: "You're not logged in. Redirecting in 1 second...",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (liked) {
      service
        .unlike(article.slug, token)
        .then((response) => {
          setLikes((prevLikes) => prevLikes - 1);
          setLiked(false);
          dispatch(unlikeArticle({ slug: response.article.slug }));
        })
        .catch((reason) => reason);
    } else {
      service
        .like(article.slug, token)
        .then((response) => {
          setLikes((prevLikes) => prevLikes + 1);
          setLiked(true);
          dispatch(likeArticle({ slug: response.article.slug }));
        })
        .catch((reason) => reason);
    }
  };

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
