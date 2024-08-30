import { Box, Flex, Image, Link, useMediaQuery } from "@chakra-ui/react";

export default function Navigation({ children }) {
  const [lessThan570] = useMediaQuery("(max-width: 570px)");

  return (
    <Box
      backgroundColor="#fff"
      position="fixed"
      zIndex={1}
      top={0}
      minW="100%"
      borderBottom="1px solid #000"
    >
      <header>
        <Flex align="center" alignContent="center">
          <Link>
            {lessThan570 ? (
              <Image
                src="/logo.svg"
                alt="Kitt's blog"
                minWidth="48px"
                minHeight="48px"
                maxW="48px"
                maxH="48px"
              />
            ) : (
              <h1 style={{ paddingLeft: "22px", fontSize: "18px", fontWeight: "bold" }}>
                KITT&apos;S BLOG
              </h1>
            )}
          </Link>
          <Box ml="auto" pt="16px" pb="16px" pr="22px">
            {children}
          </Box>
        </Flex>
      </header>
    </Box>
  );
}
