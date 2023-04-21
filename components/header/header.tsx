import {
  Flex,
  useColorModeValue,
  Container,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";
import { ColorModeButton } from "../color-mode-button";
import { HeaderBox } from "../header-box/header-box";

export const Header = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Head>
        <title>ITL</title>
        <meta
          name="description"
          content="Points!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg={bg} py={8} direction={{ base: "column", md: "row" }}>
        <Container maxW="container.md">
          <Flex>
            <HeaderBox title="Points!" titleRight={<ColorModeButton />}>
              <Text mt={2}>Discover which songs you should be playing in <Link variant="outgoing" as={NextLink} href={"https://itl2023.groovestats.com/"}>
                ITL 2023
              </Link>. Songs are ranked by your score relative to similarly-ranking players.</Text>
            </HeaderBox>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};
