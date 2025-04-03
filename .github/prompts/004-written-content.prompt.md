---
description: Written Content
globs: content/*.{md,mdx,ts}
---
# Written Content
Do no make changes to content unless specifically instructed to do so.

<rule>
name: written_content
description: Guidelines for the content creation
filters:
  - type: file_extension
    pattern: "\\.md?$|_meta\\.ts"
  - type: path
    pattern: "content/"
  - type: event
    pattern: "file_create|file_modify"

actions:
  - type: requirement
    message: |
      No modifications to content unless specifically instructed to do so.

      1. Do not create or modify content unless specifically asked
      2. Content changes can be suggested in chat, but not directly written to file

metadata:
  priority: critical
  version: 1.0
  categories: ["core", "content"]
</rule>