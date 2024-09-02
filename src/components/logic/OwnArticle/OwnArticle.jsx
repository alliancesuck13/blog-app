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
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import "./OwnArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { loadArticle } from "../../../store/slicers/articleSlice";
import generateUniqueID from "../../../utils/generateUniqueID";

import OwnArticleService from "./services/OwnArticleService";

export default function OwnArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [gotError, setGotError] = useState(false);

  const dispatch = useDispatch();
  const { slugid, article } = useSelector((state) => {
    return state.article;
  });

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const service = new OwnArticleService();
    service
      .getArticle(`${slug}`)
      .then((response) => {
        dispatch(loadArticle({ article: response.article }));
        setIsLoading(false);
      })
      .catch(() => setGotError(true));
  }, [slug, dispatch]);

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
              className="button"
              style={{ position: "absolute", top: "70px", right: "16px" }}
            >
              <span style={{ fontSize: "12px" }}>12</span>
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
                      <Button colorScheme="red">Apply</Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Button
                colorScheme="green"
                type="button"
                onClick={() => navigate(`/articles/${slugid}/edit`)}
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
