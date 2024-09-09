import { Avatar, Tag, useMediaQuery, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LikeService from "../../../services/LikeService";
import { likeArticle, unlikeArticle } from "../../../store/slicers/articlesSlice";
import cutTag from "../../../utils/cutTag";
import ArticleMinimized from "../../ui/ArticleMinimized/ArticleMinimized";

export default function ArticleMinimizedLayout({ article }) {
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
    <ArticleMinimized
      liked={liked}
      likes={likes}
      like={like}
      username={username}
      article={article}
      avatar={avatar}
      tags={tags}
    />
  );
}
