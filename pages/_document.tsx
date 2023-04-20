import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content="https://itl.zexyu.com" />
        <meta property="og:title" content="ITL HELPER" />
        <meta
          property="og:description"
          content="ITL Helper"
        />
        <meta
          property="og:image"
          content="https://andrew.alcuria.net/images/me.png"
        />
        <meta property="og:site_name" content="ITL HELPER" />
      </Head>

      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
