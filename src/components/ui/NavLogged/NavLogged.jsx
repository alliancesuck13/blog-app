import { Avatar, Button, Flex, Link, useMediaQuery } from "@chakra-ui/react";

export default function NavLogged() {
  const [lessThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <Flex alignItems="center">
      <Button type="button" colorScheme="green" variant="solid" mr="10px">
        Create article
      </Button>
      <Link _hover={{ textDecorationLine: "none" }}>
        <Flex alignItems="center">
          {lessThan500 ? null : (
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                marginRight: "5px",
              }}
            >
              Anonymouse User
            </span>
          )}
          <Avatar name="Anonymouse User" src="" />
        </Flex>
      </Link>
      <Button type="button" colorScheme="gray" variant="solid" ml="10px">
        Log Out
      </Button>
    </Flex>
  );
}
