import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content="https://itl.zexyu.com" />
        <meta property="og:title" content="Points!" />
        <meta
          property="og:description"
          content="Discover which songs you should be playing in ITL 2023. Songs are ranked by your score relative to similarly-ranked players."
        />
        <meta property="og:site_name" content="Points!" />
      </Head>

      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
