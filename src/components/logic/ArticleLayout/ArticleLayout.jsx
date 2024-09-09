import { Avatar, Tag, useMediaQuery, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Article from "../../ui/Article";
import { loadArticle } from "../../../store/slicers/articleSlice";
import LikeService from "../../../services/LikeService";
import { likeArticle, unlikeArticle } from "../../../store/slicers/articlesSlice";
import cutTag from "../../../utils/cutTag";

import ArticleService from "./services/ArticleService";

export default function ArticleLayout() {
  const article = useSelector((state) => {
    return state.article.article;
  });
  document.title = article.title;

  const [isLoading, setIsLoading] = useState(true);
  const [gotError, setGotError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { token, username, loggedIn } = useSelector((state) => state.user);

  const { slug } = useParams();

  const toast = useToast();

  useEffect(() => {
    const service = new ArticleService();

    service
      .getArticle(`${slug}`, token)
      .then((response) => {
        if (response.message === "404") {
          setIsLoading(false);
          navigate("/error-404");
        }

        username === response.article.author.username && loggedIn
          ? navigate(`/articles/${username}/${slug}`)
          : navigate(`/articles/${slug}`);

        dispatch(loadArticle({ article: response.article }));
        setIsLoading(false);
        if (!isLoading) {
          article.favorited ? setLiked(true) : setLiked(false);
          setLikes(article.favoritesCount);
        }
      })
      .catch(() => setGotError(true));
  }, [article.favorited, article.favoritesCount, isLoading]);

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
      service
        .unlike(article.slug, token)
        .then((response) => {
          setLikes(response.article.favoritesCount);
          setLiked(false);
          dispatch(unlikeArticle({ slug }));
        })
        .catch((reason) => reason);
    }

    if (!liked) {
      service
        .like(article.slug, token)
        .then((response) => {
          setLikes(response.article.favoritesCount);
          setLiked(true);
          dispatch(likeArticle({ slug }));
        })
        .catch((reason) => reason);
    }
  };

  const [isLargerThan888] = useMediaQuery("(min-width: 888px)");
  const avatar = isLargerThan888 ? (
    <Avatar name={article.author.username} src={article.author.image} />
  ) : null;

  const tags = article.tagList.map((tag, index) => (
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

  return (
    <Article
      isLoading={isLoading}
      gotError={gotError}
      isLargerThan888={isLargerThan888}
      article={article}
      avatar={avatar}
      tags={tags}
      liked={liked}
      likes={likes}
      like={like}
    />
  );
}
