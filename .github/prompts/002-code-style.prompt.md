---
description: Code Style Guidelines
globs: "**/*.{js,ts,tsx,jsx}"
---
# Code Style Guidelines
Standards for maintaining consistent code style across the project.

<rule>
name: code_style_standards
description: Enforce consistent coding style across the project
filters:
  - type: file_extension
    pattern: "\\.(js|ts|tsx|jsx)$"
  - type: event
    pattern: "file_create|file_modify"

actions:
  - type: suggest
    message: |
      When writing code for this project:

      1. Use TypeScript for all new code
      2. Follow functional programming principles where possible:
         - Prefer pure functions
         - Avoid mutations when practical
         - Use immutable data structures
      
      3. Naming conventions:
         - camelCase for variables and functions
         - PascalCase for classes, interfaces, and React components
         - UPPER_CASE for constants
      
      4. Always define proper types:
         - Avoid `any` type unless absolutely necessary
         - Use interfaces for object shapes
         - Use generics appropriately
      
      5. Component structure:
         - Keep components small and focused
         - Extract reusable logic to custom hooks
         - Follow the single responsibility principle
         - Use React 19 features appropriately

      6. Code quality tools:
         - All code must pass ESLint checks with the project's configuration
         - Run linting before submitting code for review: `yarn lint`
         - Use IDE extensions to enable real-time linting feedback
         - Do not disable eslint rules with inline comments unless absolutely necessary and documented
         - Use knip to detect unused code and dependencies: `yarn knip`
         - Ensure package versions follow conventions enforced by syncpack

examples:
  - input: |
      // Bad
      function get_data(obj: any) {
        obj.processed = true;
        return obj;
      }
      
      // Good
      function getData<T extends object>(obj: T): T & { processed: boolean } {
        return { ...obj, processed: true };
      }

metadata:
  priority: high
  version: 1.0
  categories: ["code-quality", "typescript"]
</rule>
