import { Box, Button, FormControl, FormLabel, Input, Link } from "@chakra-ui/react";

export default function SignIn() {
  return (
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
      <FormControl isRequired mb="8px">
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "48px" }}>
          Sign In
        </h2>
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
          placeholder="Extr4chaD1"
        />
        <Button
          color="#fff"
          backgroundColor="#1890FF"
          _hover={{ backgroundColor: "#56a8f5" }}
          _active={{ backgroundColor: "#95c7f5" }}
          width="100%"
          type="submit"
        >
          Login
        </Button>
      </FormControl>
      <p>
        Don&apos;t have an account? <Link color="#56a8f5">Sign Up</Link>
      </p>
    </Box>
  );
}
