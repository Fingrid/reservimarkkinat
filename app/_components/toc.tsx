"use client";

import type { Heading } from 'nextra'
import type { FC } from 'react'
import { SidePanel } from "@fingrid/design-system-components";

export const TOC: FC<{ toc: Heading[] }> = ({ toc }) => {
  return (
    <SidePanel header="Table of Contents" isOpen={true} hideToggle={true}>
      <ul>
        {toc.map(heading => (
          <li key={heading.id}><a href={`#${heading.id}`}>{heading.value}</a></li>
        ))}
      </ul>
    </SidePanel>
  )
}
