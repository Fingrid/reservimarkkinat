import { MDXComponents, useMDXComponents as getNextraComponents } from 'nextra/mdx-components';
import { Blockquote } from './app/mdx-components/Blockquote';
import { ScalarUI } from './app/mdx-components/ScalarUI';
import { TOC } from './app/_components/toc';
 
// Get the default MDX components
const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        <div style={{ flexGrow: 1, padding: 20 }}>{children}</div>
        <TOC toc={toc} />
      </>
    )
  }
})
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...defaultComponents,
    ...components ?? {},
    blockquote: Blockquote,
    scalarUI: ScalarUI
  }
}
