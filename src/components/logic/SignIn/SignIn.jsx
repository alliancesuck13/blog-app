/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { loadUserData } from "../../../store/slicers/userSlice";

import SignInService from "./services/SignInService";

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useDispatch();
  const [invalidPasswordOrEmail, setInvalidPasswordOrEmail] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  const service = new SignInService();
  const onSubmit = (data) => {
    setIsLoading(true);
    setInvalidPasswordOrEmail(false);
    setError(false);
    const body = { user: data };
    service
      .signIn(body)
      .then((response) => {
        if (response.message === "422") {
          setInvalidPasswordOrEmail(true);
          setIsLoading(false);
          return null;
        }

        setInvalidPasswordOrEmail(false);
        setError(false);
        setIsLoading(false);

        dispatch(
          loadUserData({
            username: response.user.username,
            email: response.user.email,
            token: response.user.token,
          })
        );

        return response;
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  return (
    <>
      {error && (
        <Alert status="error" transform="translateY(-15px)">
          <AlertIcon />
          <AlertDescription>
            Something did wrong with connection. Reload the page and try again
          </AlertDescription>
        </Alert>
      )}
      <Box
        ml="auto"
        mr="auto"
        transform="translateY(8%)"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="8px">
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "48px" }}>
              Sign In
            </h2>
            {invalidPasswordOrEmail && (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>Invalid email or password</AlertDescription>
              </Alert>
            )}
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
            {emailError ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>{emailError}</AlertDescription>
              </Alert>
            ) : null}
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              mb="21px"
              type="password"
              placeholder="Extr4chaD1"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {passwordError ? (
              <Alert status="error" transform="translateY(-15px)">
                <AlertIcon />
                <AlertDescription>{passwordError}</AlertDescription>
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
              Login
            </Button>
          </FormControl>
        </form>
        <p>
          Don&apos;t have an account? <Link color="#56a8f5">Sign Up</Link>
        </p>
      </Box>
    </>
  );
}
