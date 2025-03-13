import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { ScalarUI } from '@/mdx-components/ScalarUI';
import { Callout } from '@/mdx-components/Callout';
import { withGitHubAlert } from "nextra/components";
import type { MDXComponents } from 'nextra/mdx-components';
import type { ComponentProps, FC } from 'react'
import cn from 'clsx'

const themeComponents = getThemeComponents()

const Blockquote: FC<ComponentProps<'blockquote'>> = props => (
  <blockquote
    className={cn(
      'x:not-first:mt-6 x:border-gray-300 x:italic x:text-gray-700 x:dark:border-gray-700 x:dark:text-gray-400',
      'x:border-s-2 x:ps-6'
    )}
    {...props}
  />
)
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...themeComponents,
    scalarUI: ScalarUI,
    blockquote: withGitHubAlert(({ type, ...props }) => {
      const calloutType = (
        {
          caution: 'error',
          important: 'important',
          note: 'info',
          tip: 'default',
          warning: 'warning'
        } as const
      )[type]
  
      return <Callout type={calloutType} {...props} />
    }, Blockquote),
    ...components ?? {},
  }
}
