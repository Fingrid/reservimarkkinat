import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { ScalarUI } from '@/mdx-components/ScalarUI';
import type { MDXComponents } from 'nextra/mdx-components';

const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components?: MDXComponents) {
  return {
    ...themeComponents,
    scalarUI: ScalarUI,
    ...components ?? {},
  }
}
