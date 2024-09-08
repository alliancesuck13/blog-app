/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import Markdown from "markdown-to-jsx";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Tag,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import "./OwnArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { loadArticle } from "../../../store/slicers/articleSlice";
import generateUniqueID from "../../../utils/generateUniqueID";
import LikeService from "../../../services/LikeService";
import {
  likeArticle,
  removeArticle,
  unlikeArticle,
} from "../../../store/slicers/articlesSlice";
import cutTag from "../../../utils/cutTag";

import OwnArticleService from "./services/OwnArticleService";

export default function OwnArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [gotError, setGotError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);

  const { token, username, loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { slug } = useParams();
  const toaster = useToast();

  const service = new OwnArticleService();
  useEffect(() => {
    service
      .getArticle(`${slug}`, token)
      .then((response) => {
        if (response.message === "404") {
          setIsLoading(false);
          navigate("/error-404");
        }

        if (username === response.article.author.username && loggedIn) {
          navigate(`/articles/${username}/${slug}`);
        }
        dispatch(loadArticle({ article: response.article }));
        setIsLoading(false);

        setLiked(response.article.favorited);
        setLikes(response.article.favoritesCount);
      })
      .catch(() => setGotError(true));
  }, [slug, dispatch, loggedIn, navigate, username, token]);

  const likeService = new LikeService();

  const like = () => {
    if (!loggedIn) {
      setTimeout(() => navigate("/sign-in"), 1000);
      toaster({
        title: "You're not logged in. Redirecting in 1 second...",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (liked) {
      likeService
        .unlike(article.slug, token)
        .then((response) => {
          setLikes(response.article.favoritesCount);
          setLiked(false);
          dispatch(unlikeArticle({ slug }));
        })
        .catch((reason) => reason);
    } else {
      likeService
        .like(article.slug, token)
        .then((response) => {
          setLikes(response.article.favoritesCount);
          setLiked(true);
          dispatch(likeArticle({ slug }));
        })
        .catch((reason) => reason);
    }
  };

  const deleteArticle = () => {
    setIsDeleteLoading(true);
    service
      .deleteArticle(slug, token)
      .then(() => {
        toaster({
          title: "Article was successfully deleted",
          status: "success",
          isClosable: true,
        });
        dispatch(removeArticle({ slug }));
        navigate("/");
        setIsDeleteLoading(false);
      })
      .catch(() => {
        toaster({
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
              style={{ position: "absolute", top: "70px", right: "16px" }}
              onClick={like}
            >
              <span style={{ fontSize: "12px" }}>{likes}</span>
            </button>
            <Flex position="absolute" top="110px" right="16px">
              <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
                closeOnBlur={false}
              >
                {lessThan496 ? (
                  <Button onClick={onToggle} colorScheme="red" type="button" mr="5px">
                    Delete
                  </Button>
                ) : (
                  <PopoverTrigger>
                    <Button onClick={onToggle} colorScheme="red" type="button" mr="5px">
                      Delete
                    </Button>
                  </PopoverTrigger>
                )}
                <PopoverContent
                  position={lessThan496 ? "absolute" : ""}
                  top={lessThan496 ? "120px" : 0}
                >
                  <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>Are you sure you want to delete your article?</PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={deleteArticle}
                        isLoading={isDeleteLoading}
                      >
                        Apply
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Button
                colorScheme="green"
                type="button"
                onClick={() => navigate(`/articles/${article.slug}/edit`)}
              >
                Edit
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </article>
  );
}
