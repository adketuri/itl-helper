import { Inter } from "@next/font/google";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer"
import { RankView } from "../components/rank-view/rank-view";
import { Flex } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <RankView />
      <Footer />
    </Flex>
  );
}

export { getServerSideProps } from "../components/chakra";
