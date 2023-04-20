import { Inter } from "@next/font/google";
import { Header } from "../components/header/header";
import { RankView } from "../components/rank-view/rank-view";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <RankView />
    </>
  );
}

export { getServerSideProps } from "../components/chakra";
