import { MDXComponents, useMDXComponents as getNextraComponents } from 'nextra/mdx-components';
import { useMDXComponents as docsComponents } from 'nextra-theme-docs';
import { Blockquote } from './app/mdx-components/Blockquote';
import { ScalarUI } from './app/mdx-components/ScalarUI';
import { TOC } from './app/_components/toc';

// Get the default MDX components
const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        <main className="flex-1 max-w-none">
          {children}
        </main>
        <aside className="sticky top-8 hidden w-92 shrink-0 xl:block">
          <TOC toc={toc} />
        </aside>
      </>
    )
  }
})
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...defaultComponents,
    ...components ?? {},
    ...docsComponents,
    blockquote: Blockquote,
    scalarUI: ScalarUI
  }
}
