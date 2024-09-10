/* eslint-disable indent */
import {
  Avatar,
  Box,
  Flex,
  Link,
  Tag,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Link as RouterLink,
} from "react-router-dom";
import { format } from "date-fns";

import DeleteAndEditButtons from "../../../components/ui/DeleteAndEditButtons";
import Article from "../../../components/ui/Article";
import { loadArticle } from "../../../store/slicers/articleSlice";
import LikeService from "../../../services/LikeService";
import {
  likeArticle,
  removeArticle,
  unlikeArticle,
} from "../../../store/slicers/articlesSlice";
import cutTag from "../../../utils/cutTag";

import ArticleService from "./services/ArticleService";

// eslint-disable-next-line no-underscore-dangle
export default function ArticleLayout({
  article = {
    tagList: [],
    author: {},
  },
}) {
  const articleFromState = useSelector((state) => {
    return state.article.article;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUserAuthor, setIsUserAuthor] = useState(false);
  const [gotError, setGotError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const dispatch = useDispatch();
  const { token, username, loggedIn } = useSelector((state) => state.user);
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (location.pathname === `/articles/${slug}`) {
      document.title = articleFromState.title;
      const service = new ArticleService();

      service
        .getArticle(`${slug}`, token)
        .then((response) => {
          if (response.message === "404") {
            setIsLoading(false);
            navigate("/error-404");
          }

          username === response.article.author.username && loggedIn
            ? setIsUserAuthor(true)
            : setIsUserAuthor(false);

          dispatch(loadArticle({ article: response.article }));
          setIsLoading(false);
          if (!isLoading) {
            articleFromState.favorited ? setLiked(true) : setLiked(false);
            setLikes(articleFromState.favoritesCount);
          }
        })
        .catch(() => setGotError(true));
    }
    if (
      location.pathname === "/" ||
      location.pathname === "/articles" ||
      location.pathname === "/articles/"
    ) {
      article.favorited ? setLiked(true) : setLiked(false);
      !loggedIn && setLiked(false);

      setLikes(article.favoritesCount);
    }
  }, [
    articleFromState.favorited,
    article.favorited,
    articleFromState.favoritesCount,
    article.favoritesCount,
    isLoading,
  ]);

  const like = () => {
    const service = new LikeService();
    if (!loggedIn) {
      setTimeout(() => navigate("/sign-in"), 1000);
      toast({
        title: "You're not logged in. Redirecting in 1 second...",
        status: "error",
        isClosable: true,
      });
    }

    if (liked) {
      if (location.pathname === `/articles/${slug}`) {
        service
          .unlike(slug, token)
          .then((response) => {
            setLikes(response.article.favoritesCount);
            setLiked(false);
            dispatch(unlikeArticle({ slug }));
          })
          .catch((reason) => reason);
      } else {
        service
          .unlike(article.slug, token)
          .then((response) => {
            setLikes(response.article.favoritesCount);
            setLiked(false);
            dispatch(unlikeArticle({ slug }));
          })
          .catch((reason) => reason);
      }
    }

    if (!liked) {
      if (location.pathname === `/articles/${slug}`) {
        service
          .like(slug, token)
          .then((response) => {
            setLikes(response.article.favoritesCount);
            setLiked(true);
            dispatch(likeArticle({ slug }));
          })
          .catch((reason) => reason);
      } else {
        service
          .like(article.slug, token)
          .then((response) => {
            setLikes(response.article.favoritesCount);
            setLiked(true);
            dispatch(likeArticle({ slug }));
          })
          .catch((reason) => reason);
      }
    }
  };

  const deleteArticle = () => {
    const service = new ArticleService();

    setIsDeleteLoading(true);
    service
      .deleteArticle(slug, token)
      .then(() => {
        toast({
          title: "Article was successfully deleted",
          status: "success",
          isClosable: true,
        });
        dispatch(removeArticle({ slug }));
        navigate("/");
        setIsDeleteLoading(false);
      })
      .catch(() => {
        toast({
          title: "Something went wrong.",
          status: "error",
          isClosable: true,
        });
        setIsDeleteLoading(false);
      });
  };

  const [isLargerThan888] = useMediaQuery("(min-width: 888px)");
  const [lessThan496] = useMediaQuery("(max-width: 496px)");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const avatar = isLargerThan888 ? (
    <Avatar
      name={article.author.username || articleFromState.author.username}
      src={article.author.image || articleFromState.author.image}
    />
  ) : null;

  const tags =
    location === `/articles/${slug}`
      ? articleFromState.tagList.map((tag, index) => (
          <Tag
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            mr="5px"
            mb="5px"
            backgroundColor="transparent"
            border="1px solid black"
            borderRadius="3px"
          >
            {cutTag(tag)}
          </Tag>
        ))
      : article.tagList.map((tag, index) => (
          <Tag
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            mr="5px"
            mb="5px"
            backgroundColor="transparent"
            border="1px solid black"
            borderRadius="3px"
          >
            {cutTag(tag)}
          </Tag>
        ));

  if (
    location.pathname === "/" ||
    location.pathname === "/articles" ||
    location.pathname === "/articles/"
  ) {
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
            <Link as={RouterLink} to={`/articles/${article.slug}`}>
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
                  <p
                    style={{ fontSize: "18px", fontWeight: "bold", whiteSpace: "nowrap" }}
                  >
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

  return (
    <Article
      isLoading={isLoading}
      isLargerThan888={isLargerThan888}
      isUserAuthor={isUserAuthor}
      deleteAndEditButtons={
        <DeleteAndEditButtons
          isOpen={isOpen}
          isDeleteLoading={isDeleteLoading}
          onClose={onClose}
          onToggle={onToggle}
          deleteArticle={deleteArticle}
          navigateToEditArticle={() => navigate(`/articles/${slug}/edit`)}
          lessThan496={lessThan496}
        />
      }
      gotError={gotError}
      article={articleFromState}
      avatar={avatar}
      tags={tags}
      liked={liked}
      likes={likes}
      like={like}
    />
  );
}
