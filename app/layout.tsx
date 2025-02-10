import type { Metadata } from 'next'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { Theme } from './_components/theme'
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
    <html className="h-full" lang="en" dir="ltr">
      <Head faviconGlyph="✦" />
      <body className="h-full bg-(--color-neutral-white)">
        <Theme pageMap={pageMap}>{children}</Theme>
      </body>
    </html>
  )
}
 
export default RootLayout
