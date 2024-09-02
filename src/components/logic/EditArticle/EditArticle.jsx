/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import generateUniqueID from "../../../utils/generateUniqueID";

import EditArticleService from "./services/EditArticleService";

export default function EditArticle() {
  const [tagList, setTagList] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const { article } = useSelector((state) => state.article);

  document.title = `Edit ${article.title}`;

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { slug } = useParams();
  const toast = useToast();
  const service = new EditArticleService();

  useEffect(() => {
    article.author.username === user.username
      ? navigate(`/articles/${slug}/edit`)
      : navigate(`/articles/${slug}`);

    setTagList(article.tagList);
  }, [
    navigate,
    user.username,
    user.loggedIn,
    article.author.username,
    slug,
    article.tagList,
  ]);

  const titleError = formState.errors.title?.message;
  const descriptionError = formState.errors.description?.message;
  const textError = formState.errors.text?.message;

  const onSubmit = (data) => {
    setIsLoading(true);
    const body = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList,
      },
    };

    service
      .editArticle(body, slug, user.token)
      .then((response) => {
        setIsLoading(false);
        toast({
          title: "Success!",
          status: "success",
          isClosable: true,
        });

        setTimeout(
          () => navigate(`/articles/${user.username}/${response.article.slug}`),
          1000
        );
      })
      .catch((error) =>
        toast({
          title: `${error}`,
          status: "error",
          isClosable: true,
        })
      );
  };

  const addTag = () => {
    if (!tagInputValue.match(/^(?!\s*$).+/)) return;
    if (tagList.findIndex((value) => value === tagInputValue) !== -1) {
      toast({
        title: "You already added this tag",
        status: "error",
        isClosable: true,
      });
      setTagInputValue("");
      return;
    }
    setTagList([...tagList, tagInputValue]);
    setTagInputValue("");
  };

  const onInput = (e) => {
    setTagInputValue(e.target.value);
  };

  const clearInput = () => setTagInputValue("");

  const renderTagList = tagList.map((tag) => {
    return (
      <Flex mb="5px" key={generateUniqueID()}>
        <Input
          maxWidth="300px"
          type="text"
          readOnly
          placeholder="The added tag is here"
          value={tag}
        />
        <Button
          colorScheme="red"
          ml="17px"
          width="120px"
          type="button"
          onClick={() => setTagList(tagList.filter((value) => value !== tag))}
        >
          Delete
        </Button>
      </Flex>
    );
  });

  return (
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
      transform="translateY(100px)"
    >
      <h2 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
        Edit article
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt="21px">
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            defaultValue={article.title}
            {...register("title", {
              required: "This field is required",
              pattern: {
                value: /^(?!\s*$).+/,
                message: "The input must not contain spaces",
              },
            })}
          />
          {titleError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{titleError}</AlertDescription>
            </Alert>
          )}
          <FormLabel mt="21px" htmlFor="description">
            Short Description
          </FormLabel>
          <Input
            id="description"
            type="text"
            placeholder="Description"
            defaultValue={article.description}
            {...register("description", {
              required: "This field is required",
              pattern: {
                value: /^(?!\s*$).+/,
                message: "The input must not contain spaces",
              },
            })}
          />
          {descriptionError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{descriptionError}</AlertDescription>
            </Alert>
          )}
          <FormLabel mt="21px" htmlFor="text">
            Text
          </FormLabel>
          <Textarea
            id="text"
            size="lg"
            resize="vertical"
            placeholder="Text"
            defaultValue={article.body}
            {...register("body", {
              required: "This field is required",
              pattern: {
                value: /^(?!\s*$).+/,
                message: "The input must not contain spaces",
              },
            })}
          />
          {textError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{textError}</AlertDescription>
            </Alert>
          )}
          <FormLabel mt="21px" htmlFor="tags">
            Tags
          </FormLabel>
          {renderTagList}
          <Flex mb="21px">
            <Input
              maxWidth="300px"
              id="tags"
              type="text"
              placeholder="Add tag"
              onInput={onInput}
              value={tagInputValue}
            />
            <Button
              colorScheme="red"
              ml="17px"
              width="120px"
              type="button"
              onClick={clearInput}
            >
              Delete
            </Button>
            <Button
              colorScheme="green"
              ml="17px"
              width="120px"
              type="button"
              onClick={addTag}
            >
              Add tag
            </Button>
          </Flex>

          <Button colorScheme="blue" minWidth="300px" type="submit" isLoading={isLoading}>
            Edit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
