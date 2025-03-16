---
description: Commit Message Guidelines
globs: ".git/COMMIT_EDITMSG"
---
# Commit Message Guidelines
Standards for writing clear and consistent commit messages.

<rule>
name: commit_message_format
description: Enforce consistent commit message format for the reserve markets documentation portal
filters:
  - type: file_name
    pattern: "COMMIT_EDITMSG"
  - type: event
    pattern: "file_create|file_modify"

actions:
  - type: suggest
    message: |
      Commit messages should follow the Conventional Commits specification, which is enforced by husky:

      1. Format: `<type>[optional scope]: <description>`
         - feat: A new feature (e.g., new market documentation)
         - fix: A bug fix (e.g., correcting message format descriptions)
         - docs: Documentation only changes (e.g., improving readability)
         - style: Changes that don't affect the meaning (e.g., formatting)
         - refactor: Code change that neither fixes a bug nor adds a feature
         - perf: Performance improvements
         - test: Adding missing tests or correcting existing tests
         - chore: Changes to build process or auxiliary tools
      
      2. Scopes for this project:
         - afrr: aFRR market related changes
         - mfrr: mFRR market related changes
         - fcr: FCR market related changes
         - ffr: FFR market related changes
         - common: Common components or documentation
      
      3. Keep the first line under 72 characters
      
      4. Add detailed description in the body if needed, separated by a blank line
      
      5. For breaking changes, add BREAKING CHANGE: at the beginning of the body
      
      6. Note: Husky will automatically verify your commit messages conform to these standards

examples:
  - input: |
      # Bad
      updated aFRR docs
      
      # Good
      docs(afrr): update energy market message format documentation
      
      - Add new bid document example
      - Clarify acknowledgement document attributes
      - Update validation rules for bid rejection

metadata:
  priority: medium
  version: 1.0
  categories: ["git", "workflow"]
</rule>
