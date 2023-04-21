import { useColorModeValue, Flex, Container, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Flex bg={bg} py={8} direction={{ base: "column", md: "row" }}>
        <Container maxW="container.md">
          <Flex direction="column">
            <Text variant="sub">by <Link variant="outgoing" as={NextLink} href="https://twitter.com/zexyu">@zexyu</Link></Text>
            <Text variant="sub"><Link variant="outgoing" as={NextLink} href={"https://ko-fi.com/zexyu"}>
              Support Me
            </Link></Text>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};