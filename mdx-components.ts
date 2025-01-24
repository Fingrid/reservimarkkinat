import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { MDXComponents } from 'nextra/mdx-components';
import { Blockquote } from './mdx-components/Blockquote.tsx';
 
// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...themeComponents,
    ...components ?? {},
    blockquote: Blockquote,
  }
}
