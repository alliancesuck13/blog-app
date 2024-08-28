// eslint-disable-next-line import/no-extraneous-dependencies
import { Avatar, Box, Button, Flex, Image, Tag } from "@chakra-ui/react";
import { format } from "date-fns";

export default function ArticleMinimized() {
  return (
    <article>
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
      >
        <Flex>
          <Flex>
            <h2
              style={{
                fontSize: "20px",
                color: "#1890FF",
                maxWidth: "700px",
              }}
            >
              Article title about title and about titleout title and about titleout title
              and about title
            </h2>
            <Button
              padding="0"
              alignSelf="flex-start"
              backgroundColor="transparent"
              _hover="none"
              _active="none"
            >
              <Image padding="0" src="/unliked.svg" alt="" boxSize="20px" />
              <span style={{ fontSize: "12px" }}>12</span>
            </Button>
          </Flex>
          <Box w="141px" ml="auto">
            <Flex>
              <Flex flexDirection="column" mr="12px">
                <p style={{ fontSize: "18px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  John Doe
                </p>
                <p style={{ fontSize: "12px", color: "#00000080" }}>
                  {format(new Date().toISOString(), "PP")}
                </p>
              </Flex>
              <Avatar name="Anonymouse User" src="" />
            </Flex>
          </Box>
        </Flex>
        <Box maxW="700px">
          <Tag
            mr="5px"
            mb="5px"
            backgroundColor="transparent"
            border="1px solid black"
            borderRadius="3px"
          >
            tag1
          </Tag>
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
