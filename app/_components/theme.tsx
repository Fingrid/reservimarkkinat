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
    <div className="flex min-h-full flex-col">
      <Header />
      <Navbar pageMap={pageMap} />
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 py-10">
        <aside className="sticky top-8 hidden w-64 shrink-0 lg:block">
          <Sidebar pageMap={pageMap} />
        </aside>

        {children}
      </div>
      <Footer />
    </div>
  )
}
