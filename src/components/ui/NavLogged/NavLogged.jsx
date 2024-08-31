import { Avatar, Button, Flex, Link, useMediaQuery } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { signOut } from "../../../store/slicers/userSlice";

export default function NavLogged() {
  const [lessThan500] = useMediaQuery("(max-width: 500px)");
  const username = useSelector((state) => {
    return state.user.username;
  });
  const userImage = useSelector((state) => {
    return state.user.image;
  });
  const dispatch = useDispatch();

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
