// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Button, Flex, Link } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <Box backgroundColor="#fff">
      <header>
        <Flex align="center" alignContent="center">
          <Link>
            <h1 style={{ paddingLeft: "22px", fontSize: "18px" }}>Kitt&apos;s blog</h1>
          </Link>
          <Box ml="auto" pt="16px" pb="16px" pr="22px">
            <Button colorScheme="teal" variant="ghost" mr="16px">
              Sign in
            </Button>
            <Button colorScheme="teal" variant="solid">
              Sign up
            </Button>
          </Box>
        </Flex>
      </header>
    </Box>
  );
}
