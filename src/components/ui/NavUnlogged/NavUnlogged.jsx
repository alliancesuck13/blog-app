import { Button } from "@chakra-ui/react";

export default function NavUnlogged() {
  return (
    <>
      <Button type="button" variant="ghost" mr="16px">
        Sign in
      </Button>
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
    </>
  );
}
