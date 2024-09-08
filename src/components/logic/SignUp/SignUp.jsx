/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadUserData } from "../../../store/slicers/userSlice";

import SignUpService from "./services/SignUpService";

export default function SignUp() {
  document.title = "Sign Up";
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  });

  const [isUsernameOrEmailTaken, setIsUsernameOrEmailTaken] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const service = new SignUpService();
  const usernameError = formState.errors.username?.message;
  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const passwordRepeatError = formState.errors.passwordRepeat?.message;
  const checkbox = formState.errors.checkbox?.message;

  useEffect(() => {
    user.loggedIn ? navigate("/") : navigate("/sign-up");
  }, [navigate, user.loggedIn]);

  const password = watch("password");

  const onSubmit = (data) => {
    setIsLoading(true);
    const body = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    service
      .signUp(body)
      .then((response) => {
        if (response.message === "422") {
          setIsUsernameOrEmailTaken(true);
          setIsLoading(false);
          return null;
        }

        setIsUsernameOrEmailTaken(false);
        setIsLoading(false);
        toast({
          title: "You're successfuly registred! You will be redirected in 1 second...",
          status: "success",
          isClosable: true,
        });

        dispatch(
          loadUserData({
            username: response.user.username,
            email: response.user.email,
            token: response.user.token,
          })
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);

        return response;
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      {isError ? (
        <Alert status="error" transform="translateY(-15px)">
          <AlertIcon />
          <AlertDescription>Something did wrong. Try to reload the page</AlertDescription>
          {window.scrollTo({ top: 0, behavior: "smooth" })}
        </Alert>
      ) : null}
      <Box
        ml="auto"
        mr="auto"
        transform="translateY(90px)"
        p="48px 32px"
        maxW="384px"
        backgroundColor="#fff"
        textAlign="center"
        borderRadius="6px"
        boxShadow="box-shadow: 0px 1.46px 7.05px 0px #00000007;
                 box-shadow: 0px 2.75px 13.27px 0px #00000009;
                 box-shadow: 0px 4.91px 23.68px 0px #0000000B;
                 box-shadow: 0px 9.19px 44.28px 0px #0000000D;
                 box-shadow: 0px 22px 106px 0px #00000012"
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "48px" }}>
          Create new account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="8px">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              mb="21px"
              type="text"
              placeholder="must befrom 3 to 20 symbols"
              {...register("username", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9]{3,20}$/,
                  message: "Username must be valid",
                },
              })}
            />
            {usernameError || isUsernameOrEmailTaken ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>
                  {usernameError || "Username or email already are taken"}
                </AlertDescription>
              </Alert>
            ) : null}
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              mb="21px"
              type="email"
              placeholder="johnsnow@yummi.com"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email must be valid",
                },
              })}
            />
            {emailError || isUsernameOrEmailTaken ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>
                  {emailError || "Username or email already are taken"}
                </AlertDescription>
              </Alert>
            ) : null}
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              mb="21px"
              type="password"
              placeholder="must be from 6 to 40 symbols"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 40,
                  message: "Password must be no more than 40 characters long",
                },
              })}
            />
            {passwordError ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>{passwordError}</AlertDescription>
              </Alert>
            ) : null}
            <FormLabel htmlFor="passwordRepeat">Repeat Password</FormLabel>
            <Input
              id="passwordRepeat"
              mb="21px"
              type="password"
              placeholder="passwords must match"
              {...register("passwordRepeat", {
                required: "This field is required",
                validate: (value) => value === password || "The passwords doesn't match",
              })}
            />
            {passwordRepeatError ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>{passwordRepeatError}</AlertDescription>
              </Alert>
            ) : null}
            <Checkbox
              mb="21px"
              fontSize="12px"
              textAlign="start"
              {...register("checkbox", {
                required: "You should be an agree",
              })}
            >
              I agree to the processing of my personal information
            </Checkbox>
            {checkbox ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>{checkbox}</AlertDescription>
              </Alert>
            ) : null}
            <Button
              color="#fff"
              backgroundColor="#1890FF"
              _hover={{ backgroundColor: "#56a8f5" }}
              _active={{ backgroundColor: "#95c7f5" }}
              width="100%"
              type="submit"
              isLoading={isLoading}
            >
              Create
            </Button>
          </FormControl>
        </form>
        <p>
          Already have an account?{" "}
          <Link as={RouterLink} to="/sign-in" color="#56a8f5">
            Sign In
          </Link>
        </p>
      </Box>
    </>
  );
}
