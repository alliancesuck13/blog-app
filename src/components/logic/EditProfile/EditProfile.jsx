/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { updateUserData } from "../../../store/slicers/userSlice";

import EditProfileService from "./services/EditProfileService";

export default function EditProfile() {
  const [isUsernameOrEmailTaken, setIsUsernameOrEmailTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const usernameError = formState.errors.username?.message;
  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;
  const avatarError = formState.errors.avatar?.message;

  const service = new EditProfileService();

  const onSubmit = (data) => {
    setIsLoading(true);
    let body = Object.entries(data);
    body = Object.fromEntries(body.filter((values) => values[1] !== ""));
    body = { user: { ...body } };

    service
      .editProfile(body, user.token)
      .then((response) => {
        setIsLoading(false);

        dispatch(
          updateUserData({
            updatedToken: response.user.token,
            updatedEmail: response.user.email,
            updatedUsername: response.user.username,
            updatedImage: body.user.image || user.image,
          })
        );

        console.log(response);
      })
      .catch((reason) => {
        setIsLoading(false);
        console.log(reason);
      });
  };

  return (
    <Box
      ml="auto"
      mr="auto"
      transform="translateY(16%)"
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
            Edit profile
          </h2>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            mb="21px"
            type="text"
            placeholder="New username"
            {...register("username", {
              pattern: {
                value: /^[a-zA-Z0-9]{3,20}$/,
                message: "New username must be valid",
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
            placeholder="New email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "New email must be valid",
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
          <FormLabel htmlFor="password">New password</FormLabel>
          <Input
            id="password"
            mb="21px"
            type="password"
            placeholder="New password"
            {...register("password", {
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
          <FormLabel htmlFor="avatar">Avatar image (url)</FormLabel>
          <Input
            id="avatar"
            mb="21px"
            type="text"
            placeholder="https://i.imgur.com/Oij3XSJ.gif"
            {...register("image", {
              pattern: {
                value: /^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/,
                message:
                  "The URL must point to a valid image file (.jpg, .jpeg, .png, .gif, .svg)",
              },
            })}
          />
          {avatarError ? (
            <Alert status="error" transform="translateY(-15px)">
              <AlertIcon />
              <AlertDescription>{avatarError}</AlertDescription>
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
            Save
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
