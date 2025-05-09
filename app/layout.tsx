import type { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Layout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer } from "@/_components/Footer";
import { labGrotesqueWeb } from "@/_fonts/fonts";
import { ConfigInitializer } from "./_components/ConfigInitializer";
import "./globals.css";
import { NavBar } from "./_components/NavBar";

export const metadata: Metadata = {
  title: {
    absolute: "",
    template: "%s",
  },
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <html
      className={`${labGrotesqueWeb.variable}`}
      lang="en"
      dir="ltr"
      suppressHydrationWarning={true}
    >
      <Head faviconGlyph="FG">
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          defer
          data-domain="developers.fingrid.fi"
          src="https://plausible.io/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js"
        ></script>
      </Head>
      <body>
        <ConfigInitializer />
        <Layout
          navbar={<NavBar />}
          sidebar={{ autoCollapse: false, defaultMenuCollapseLevel: 1 }}
          pageMap={await getPageMap()}
          nextThemes={{ defaultTheme: "light" }}
          footer={<Footer />}
          editLink={null}
          feedback={{ content: null }}
          toc={{
            extraContent: undefined,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
