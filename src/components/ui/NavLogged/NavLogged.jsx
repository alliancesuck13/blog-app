import { Avatar, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function NavLogged({
  lessThan500,
  dispatch,
  userImage,
  username,
  signOut,
}) {
  return (
    <Flex alignItems="center">
      <Link as={RouterLink} to="/new-article">
        <Button type="button" colorScheme="green" variant="solid" mr="10px">
          Create article
        </Button>
      </Link>
      <Link as={RouterLink} to="/profile" _hover={{ textDecorationLine: "none" }}>
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
              {username}
            </span>
          )}
          <Avatar name={username} src={userImage} />
        </Flex>
      </Link>
      <Button
        type="button"
        colorScheme="gray"
        variant="solid"
        ml="10px"
        onClick={() => dispatch(signOut())}
      >
        Log Out
      </Button>
    </Flex>
  );
}
