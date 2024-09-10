import {
  Button,
  ButtonGroup,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function deleteAndEditButtons({
  isOpen,
  isDeleteLoading,
  onClose,
  onToggle,
  deleteArticle,
  navigateToEditArticle,
  lessThan496,
}) {
  return (
    <Flex position="absolute" top="100px" right="16px">
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        {lessThan496 ? (
          <Button onClick={onToggle} colorScheme="red" type="button" mr="5px">
            Delete
          </Button>
        ) : (
          <PopoverTrigger>
            <Button onClick={onToggle} colorScheme="red" type="button" mr="5px">
              Delete
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent
          position={lessThan496 ? "absolute" : ""}
          top={lessThan496 ? "120px" : 0}
        >
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Are you sure you want to delete your article?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteArticle}
                isLoading={isDeleteLoading}
              >
                Apply
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <Button colorScheme="green" type="button" onClick={navigateToEditArticle}>
        Edit
      </Button>
    </Flex>
  );
}
