import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { MDXComponents } from 'nextra/mdx-components';
import { Blockquote } from './app/mdx-components/Blockquote.tsx';
import { ScalarUI } from './app/mdx-components/ScalarUI.tsx';
 
// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...themeComponents,
    ...components ?? {},
    blockquote: Blockquote,
    scalarUI: ScalarUI
  }
}
