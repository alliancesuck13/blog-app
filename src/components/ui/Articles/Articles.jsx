/* eslint-disable import/no-extraneous-dependencies */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Pagination } from "antd";

export default function Articles({
  isLoaded,
  didWrong,
  totalPages,
  currentPage,
  onChangePage,
  articles,
}) {
  return (
    <Box mt="100px">
      {didWrong ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Maybe some troubles with server connection. Try to reload the page
          </AlertDescription>
        </Alert>
      ) : null}
      {isLoaded ? (
        <>
          {articles}
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalPages * 2}
            align="center"
            showSizeChanger={false}
            style={{ marginBottom: "16px" }}
            onChange={onChangePage}
          />
        </>
      ) : (
        <Flex>
          <Spinner size="xl" ml="auto" mr="auto" mt="25px" mb="25px" />
        </Flex>
      )}
    </Box>
  );
}
