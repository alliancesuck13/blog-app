import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      transform="translateY(200px)"
      maxW="920px"
      ml="auto"
      mr="auto"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://i.imgur.com/Kp9iOb5.gif"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">Oops! 404 error...</Heading>

          <Text py="2">Cannot find the page you are searching. Sorry.</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={() => navigate("/")}>
            Back
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
