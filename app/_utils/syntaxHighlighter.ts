"use client";

import { createHighlighter } from "shiki";

const themes = [
  { type: "light", theme: "github-light-default" },
  { type: "dark", theme: "github-dark-default" },
];

const highlighter = await createHighlighter({
  themes: themes.map((theme) => theme.theme),
  langs: ["xml"],
});

/**
 * Utility for syntax highlighting code using Shiki
 */
export async function highlightCode(
  code: string,
  errorLines: number[],
): Promise<string> {
  try {
    // Return HTML string with light/dark theme variants
    const highLightedCode = themes.map((theme) => {
      return highlighter.codeToHtml(code, {
        theme: theme.theme,
        lang: "xml",
        transformers: [
          {
            line(node, line) {
              node.properties["data-line"] = line;
              if (errorLines.includes(line)) {
                if ("dark" === theme.type) {
                  this.addClassToHast(node, "dark-error-line");
                } else {
                  this.addClassToHast(node, "error-line");
                }
              }
            },
          },
        ],
      });
    });

    return `
      <div class="shiki-light dark:hidden">${highLightedCode[0]}</div>
      <div class="shiki-dark hidden dark:block">${highLightedCode[1]}</div>
    `;
  } catch (error) {
    console.error("Error highlighting code:", error);
    return `<pre class="shiki-error">${code}</pre>`;
  }
}
