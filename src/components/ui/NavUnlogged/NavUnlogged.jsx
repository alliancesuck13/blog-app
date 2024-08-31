import { Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function NavUnlogged() {
  return (
    <>
      <Link as={RouterLink} to="/sign-in">
        <Button type="button" variant="ghost" mr="16px">
          Sign in
        </Button>
      </Link>
      <Link as={RouterLink} to="/sign-up">
        <Button
          border="2px solid #32a852"
          _hover={{ backgroundColor: "transparent", borderColor: "#56bf73" }}
          _active={{ backgroundColor: "transparent", borderColor: "#7ecc94" }}
          backgroundColor="transparent"
          type="button"
          variant="solid"
        >
          Sign up
        </Button>
      </Link>
    </>
  );
}
