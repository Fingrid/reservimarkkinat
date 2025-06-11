import type { Metadata } from "next";
import { Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import { Footer } from "@/_components/footer";
import { labGrotesqueWeb } from "@/_fonts/fonts";
import { FingridLogo } from "@/_components/FingridLogo";
import "./globals.css";

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
        <Layout
          navbar={
            <Navbar
              logo={
                <div className="fingrid_logo flex align-center items-center">
                  <a href="https://www.fingrid.fi/" title="Fingrid.fi Homepage"><FingridLogo width={"100%"} /></a>
                  <p className="pl-3 ml-3 border-l-[1px] border-l-[var(--color-separator)] dark:border-l-[var(--color-dark-separator)]">
                    <a className="font-bold" href="https://developers.fingrid.fi/">Developer&nbsp;Portal</a>
                  </p>
                </div>
              }
            />
          }
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
