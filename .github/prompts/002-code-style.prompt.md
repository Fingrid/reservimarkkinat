---
description: Code Style Guidelines for Reservimarkkinat Portal
globs: "**/*.{js,ts,tsx,jsx}"
---

# Code Style Guidelines

Standards for maintaining consistent code style across the Reservimarkkinat Portal project.

<rule>
name: code_style_standards
description: Enforce consistent coding style across the project
filters:
  - type: file_extension
    pattern: "\\.(js|ts|tsx|jsx)$"
  - type: event
    pattern: "file_create|file_modify"
actions:
  - type: suggestion
    message: |
      When writing code:

      1. Use TypeScript for all code:
         - No JavaScript files allowed
         - Always use strict type checking
         - Create type definitions for all data structures

      2. Next.js & React patterns:
         - Use Server Components by default
         - Only use 'use client' when necessary
         - Follow the App Router directory structure
         - Leverage Next.js built-in optimizations
         - Use React.Suspense for loading states

      3. Component structure:
         - Place components in app/_components/
         - Create page-specific components in their respective page directories
         - Use MDX for content-heavy pages
         - Follow atomic design principles
         - Keep components small and focused

      4. Naming conventions:
         - camelCase for functions, variables, and file names
         - PascalCase for components and type definitions
         - Use descriptive names that indicate purpose
         - Prefix hooks with 'use'
         - Suffix types with 'Type' and interfaces with 'Props' when appropriate

      5. Code organization:
         - Group related components together
         - Maintain clear separation of concerns
         - Keep business logic separate from UI components
         - Use barrel exports (index.ts) for component directories

      6. Quality standards:
         - Follow ESLint rules without exceptions
         - Use Prettier for formatting
         - Run `yarn lint` before commits
         - Vitest is used to test the application

examples:

- input: |
  // Bad
  export default function data() {
  const [stuff, setStuff] = useState<any>()
  return <div>{stuff}</div>
  }
  // Good
  interface DataProps {
  initialData?: string
  }
  export default function DataDisplay({ initialData }: DataProps) {
  const { data, isLoading } = useData(initialData)
  if (isLoading) return <LoadingSpinner />

      return <DisplayComponent data={data} />

  }

metadata:
priority: high
version: 1.0
categories: ["code-quality", "typescript", "next.js", "react"]
</rule>
