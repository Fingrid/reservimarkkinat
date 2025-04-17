"use client";

import { createHighlighter } from 'shiki'


/**
 * Utility for syntax highlighting code using Shiki
 */
export async function highlightCode(code: string): Promise<string> {
  try {
    
    const highlighter = await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['xml']
    })

    // Return HTML string with light/dark theme variants
    return `
      <div class="shiki-light dark:hidden">${highlighter.codeToHtml(code, {theme: 'github-light', lang: 'xml'})}</div>
      <div class="shiki-dark hidden dark:block">${highlighter.codeToHtml(code, {theme: 'github-dark', lang: 'xml'})}</div>
    `;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return `<pre class="shiki-error">${code}</pre>`;
  }
}
