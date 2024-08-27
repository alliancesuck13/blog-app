// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Button, Image } from "@chakra-ui/react";

export default function ArticleMinimized() {
  return (
    <article>
      <Box
        mt="26px"
        mb="26px"
        padding="16px"
        backgroundColor="#fff"
        w="941px"
        h="140px"
        ml="auto"
        mr="auto"
      >
        <h2>Article title</h2>
        <Button padding="0" backgroundColor="transparent" _hover="none" _active="none">
          <Image padding="0" src="/unliked.svg" alt="" boxSize="28px" />
          12
        </Button>
        <Box w="682px">
          <span
            style={{
              padding: "5px",
              paddingTop: "1px",
              paddingBottom: "2px",
              border: "1px solid black",
              borderRadius: "2px",
              fontSize: "14px",
            }}
          >
            tag1
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Box>
      </Box>
    </article>
  );
}
