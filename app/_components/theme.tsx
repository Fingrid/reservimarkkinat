import type { PageMapItem } from 'nextra'
import type { FC, ReactNode } from 'react'
import { Header} from './header'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export const Theme: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
}> = ({ children, pageMap }) => {
  return (
    <>
      <Header />
      <Navbar pageMap={pageMap} />
      <div style={{ display: 'flex' }}>
        <Sidebar pageMap={pageMap} />
        {children}
      </div>
      <Footer />
    </>
  )
}
