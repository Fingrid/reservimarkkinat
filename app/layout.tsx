import type { Metadata } from 'next'
import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { Footer } from '@/_components/footer'
import { labGrotesqueWeb } from '@/fonts'
import { FingridLogo } from '@/_components/FingridLogo'
import "./globals.css";
 
export const metadata: Metadata = {
  title: {
    absolute: '',
    template: '%s'
  }
}
 
const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <html 
    className={`${labGrotesqueWeb.variable} h-full`}
    lang="en" 
    dir="ltr" 
    suppressHydrationWarning={true}>
      <Head faviconGlyph="FG" />
      <body className="h-full">
        <Layout
          navbar={
            <Navbar 
              logo={ <div className='flex align-center items-center'><FingridLogo width={'100%'}/><p className='pl-3'>Developer&nbsp;Portal</p></div> } 
              logoLink={'https://www.fingrid.fi/'}
            />
          }
          sidebar={{ autoCollapse: false, defaultMenuCollapseLevel: 1 }}
          pageMap={await getPageMap()}
          darkMode={false}
          nextThemes={{ defaultTheme: 'light' }}
          footer={<Footer />}
          editLink={ null }
          feedback={{ content: null }}

          toc={{
            extraContent: undefined
           }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
 
export default RootLayout
