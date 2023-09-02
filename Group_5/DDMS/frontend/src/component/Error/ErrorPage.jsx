import { Container, Image, Text, Button, Center  } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import errorImg from "../../assets/Images/404-error-lost-in-space-animate.svg";

export default function ErrorPage() {
  return (
    <>
      <Container>
        <Image height={500} fit="contain" src={errorImg} />
        <Text fw={500} align="center" size={27}>
          Whoops! Lost in Space?
        </Text>
        <Text align="center" size={17}>
          The page you're looking for isn't found :(
        </Text>
        <Text align="center" size={17}>
          We suggest you go back to home
        </Text>
        <Center>
        <Button component="a" href="/" variant="subtle" leftIcon={<IconArrowLeft size={14} />} mt={6} size="lg">
      Back to Home
    </Button>
          </Center> 
      </Container>
    </>
  );
}
