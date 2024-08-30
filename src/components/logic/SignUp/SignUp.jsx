import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";

export default function SignUp() {
  return (
    <Box
      ml="auto"
      mr="auto"
      transform="translateY(2%)"
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
      <FormControl mb="8px">
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "48px" }}>
          Create new account
        </h2>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          mb="21px"
          type="text"
          isRequired
          placeholder="must befrom 3 to 20 symbols"
        />
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          mb="21px"
          type="email"
          isRequired
          placeholder="johnsnow@yummi.com"
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          mb="21px"
          type="password"
          isRequired
          placeholder="must be from 6 to 40 symbols"
        />
        <FormLabel htmlFor="passwordRepeat">Repeat Password</FormLabel>
        <Input
          id="passwordRepeat"
          mb="21px"
          type="password"
          isRequired
          placeholder="passwords must match"
        />
        <Checkbox mb="21px" fontSize="12px" textAlign="start">
          I agree to the processing of my personal information
        </Checkbox>
        <Button
          color="#fff"
          backgroundColor="#1890FF"
          _hover={{ backgroundColor: "#56a8f5" }}
          _active={{ backgroundColor: "#95c7f5" }}
          width="100%"
          type="submit"
        >
          Create
        </Button>
      </FormControl>
      <p>
        Already have an account? <Link color="#56a8f5">Sign In</Link>
      </p>
    </Box>
  );
}
