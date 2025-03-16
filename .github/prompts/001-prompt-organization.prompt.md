---
description: Prompt Organization
globs: .github/prompts/*.md
---
# Prompt Organization Guidelines
Rules for organizing and naming Copilot Prompt files in the repository. This prompt file must not be
modified unless specifically instructed to do so.

<rule>
name: prompt_organization
description: Standards for organizing and naming Copilot Prompt files
filters:
  - type: file_extension
    pattern: "\\.prompt\\.md$"
  - type: content
    pattern: "(?s)<rule>.*?</rule>"
  - type: event
    pattern: "file_create|file_modify"

actions:
  - type: suggest
    message: |
       When creating Copilot prompts:

      1. Always place rule files in PROJECT_ROOT/.github/prompts/
      2. Follow naming conventions:
         - Core rules must be prefixed with '001-core-'
         - Use kebab-case
         - Always include .prompt.md extension
         - Make names descriptive

      # Bad: Rule file in wrong location or naming
      prompts/core-my-rule.prompt.md
      my-rule.prompt.md
      .prompts/core-my-rule.prompt.md

      # Good: Rule file in correct location with proper naming
      .github/prompts/001-prompt-organization.prompt.md     # Core rule
      .github/prompts/033-search-guidelines.prompt.md               # Feature-specific rule

      When organizing Copilot prompts:

      1. Core Rules (001-xxx):
         - Must start with "001-" prefix
         - Reserved for the fundamental rules
         - Should not be changed without receiving specific instructions to do so
         - Example: 001-prompt-organization.prompt.md

      2. Feature Rules (NNN-):
         - Group related rules by feature/domain
         - Use descriptive prefixes based on domain (e.g., 032-navigation-, 033-search-)
         - Example structure:
         ```
         .github/prompts/
         ├── 001-prompt-organization.prompt.md
         ├── 032-navigation-guidelines.prompt.md
         ├── 033-search-guidelines.prompt.md
         └── ...
         ```

      3. Naming Convention:
         - Use kebab-case
         - Include feature/domain prefix
         - Be descriptive and specific
         - Examples:
           * 001-core-prompt-location.prompt.md
           * 032-navigation-guidelines.prompt.md
           * 033-search-guidelines.prompt.md

      4. Content Organization:
         - Start with clear description
         - Include relevant globs
         - Group related rules together
         - Document dependencies between rules

      5. Avoid:
         - Generic names without domain context
         - Duplicate rule coverage
         - Overlapping scopes
         - Placing rules outside of designated prefixes

examples:
  - input: |
      # Bad
      002-guidelines.prompt.md
      macro-rules.prompt.md
      1-coding.prompt.md

      # Good
      001-core-prompt-location.prompt.md
      032-navigation-guidelines.prompt.md
      033-search-guidelines.prompt.md

metadata:
  priority: high
  version: 1.0
  categories: ["core", "prompts", "project-configuration"]
</rule>