---
description: Commit Message Guidelines
globs: ".git/COMMIT_EDITMSG"
---
# Commit Message Guidelines
Standards for writing clear and consistent commit messages.

<rule>
name: commit_message_format
description: Enforce consistent commit message format
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
         - feat: A new feature
         - fix: A bug fix
         - docs: Documentation only changes
         - style: Changes that don't affect the meaning of the code
         - refactor: Code change that neither fixes a bug nor adds a feature
         - perf: Code changes that improve performance
         - test: Adding missing tests or correcting existing tests
         - chore: Changes to the build process or auxiliary tools
      
      2. Keep the first line under 72 characters
      
      3. Add detailed description in the body if needed, separated by a blank line
      
      4. For breaking changes, add BREAKING CHANGE: at the beginning of the body
      
      5. Note: Husky will automatically verify your commit messages conform to these standards and will prevent commits that don't follow the convention

examples:
  - input: |
      # Bad
      updated code
      
      # Good
      feat(auth): implement user authentication flow
      
      - Add login form component
      - Integrate with backend API
      - Store tokens in secure storage

metadata:
  priority: medium
  version: 1.0
  categories: ["git", "workflow"]
</rule>
