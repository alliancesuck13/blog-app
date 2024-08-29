import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

export default function CreateArticle() {
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
    >
      <h2 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
        Create new article
      </h2>
      <FormControl mt="21px">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" type="text" placeholder="Title" />
        <FormLabel mt="21px" htmlFor="description">
          Short Description
        </FormLabel>
        <Input id="description" type="text" placeholder="Description" />
        <FormLabel mt="21px" htmlFor="text">
          Text
        </FormLabel>
        <Textarea id="text" size="lg" resize="vertical" placeholder="Text" />
        <FormLabel mt="21px" htmlFor="tags">
          Tags
        </FormLabel>
        <Flex mb="5px">
          <Input
            maxWidth="300px"
            type="text"
            readOnly
            placeholder="The added tag are here"
          />
          <Button colorScheme="red" ml="17px" width="120px" type="button">
            Delete
          </Button>
        </Flex>
        <Flex mb="21px">
          <Input maxWidth="300px" id="tags" type="text" placeholder="Add tag" />
          <Button colorScheme="red" ml="17px" width="120px" type="button">
            Delete
          </Button>
          <Button colorScheme="green" ml="17px" width="120px" type="button">
            Add tag
          </Button>
        </Flex>
        <Button colorScheme="blue" minWidth="300px" type="submit">
          Send
        </Button>
      </FormControl>
    </Box>
  );
}
