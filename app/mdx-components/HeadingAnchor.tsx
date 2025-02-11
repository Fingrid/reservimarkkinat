'use client'

import { useEffect, useRef } from 'react'
import type { FC } from 'react'

export const HeadingAnchor: FC<{ id: string }> = ({ id }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null!)

  useEffect(() => {
    const el = anchorRef.current
  }, [])

  return (
    <a
      href={`#${id}`}
      className="x:focus-visible:nextra-focus subheading-anchor"
      aria-label="Permalink for this section"
      ref={anchorRef}
    />
  )
}
