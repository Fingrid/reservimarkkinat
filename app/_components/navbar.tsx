'use client'

import { NavBarMain } from '@fingrid/design-system-components'
import { usePathname } from 'next/navigation'
import type { PageMapItem } from 'nextra'
import { Anchor } from 'nextra/components'
import { normalizePages } from 'nextra/normalize-pages'
import type { FC } from 'react'

export const Navbar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname()
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: pathname
  })

  return (
    <NavBarMain
      items={
        topLevelNavbarItems.map(item => {
          const route = item.route || ('href' in item ? item.href! : '')
          return {
            children: item.title,
            href: route,
          }
        })}
    />
  )
}
