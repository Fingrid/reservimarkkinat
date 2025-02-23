import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Blockquote } from './app/mdx-components/Blockquote';
import { ScalarUI } from './app/mdx-components/ScalarUI';
import type { MDXComponents } from 'nextra/mdx-components';

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
