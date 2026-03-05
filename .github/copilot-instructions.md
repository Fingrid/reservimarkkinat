## Project Context

**Reservimarkkinat Developer Portal** is a Next.js/Nextra documentation site for Fingrid partners with an integrated **XML validator tool** for testing reserve market message formats against XSD schemas.

### Key Architecture

- **Content Layer**: MDX-based documentation in `/content` - organized by market platform (mFRR_C, mFRR_E, aFRR_C, aFRR_E, FCR, FFR)
- **App Layer**: `/app` contains:
  - `layout.tsx` - Nextra-based root layout with Fingrid branding
  - `validator/page.tsx` - Interactive XML validation tool (main feature)
  - `_store/` - Zustand state management (validatorStore, xmlSchemaStore)
  - `_utils/xml/` - XML validation logic using libxml2-wasm WASM binding
  - `_components/` - Reusable UI components (Fingrid Design System)
- **Static Assets**: `/public/schemas/` contains versioned XSD schema files organized by CIM versions
- **Build Output**: `out/` (export) or `standalone` mode with pagefind search index

### Technologies

- **Framework**: Next.js 15 + Nextra 4 (static site generation with MDX)
- **Styling**: Tailwind CSS 4 + @tailwindcss/typography for MDX prose
- **State Management**: Zustand 5 with Immer middleware for immutable updates
- **XML Processing**: libxml2-wasm (WASM) for client-side XSD validation
- **Components**: Fingrid Design System (@fingrid/design-system-components), Scalar API Reference
- **Testing**: Vitest with jsdom environment
- **Code Quality**: ESLint (strict TypeScript rules + Next.js plugin), Prettier
- **Package Manager**: pnpm with workspace support

## Developer Workflows

### Build & Develop

```bash
pnpm dev              # Start Next.js dev server (localhost:3000)
pnpm build           # Build production + generate pagefind search index
pnpm start           # Serve pre-built app
pnpm clean           # Remove .next and out directories
```

### Code Quality

```bash
pnpm lint            # Check for issues
pnpm lint:fix        # Auto-fix with ESLint
pnpm format          # Format with Prettier
```

### Testing

```bash
pnpm test            # Run Vitest suite (jsdom environment)
pnpm test:watch      # Watch mode
pnpm test:coverage   # Coverage report
```

Test files use `*.test.ts(x)` naming and are co-located with source. Vitest setup: `globals=true`, `environment=jsdom`.

## Critical Patterns

### XML Validator Architecture

The validator is the **core interactive feature**. Data flow:

1. **Input**: User uploads/pastes XML in `/validator` page (client component)
2. **Schema Discovery**: `extractXMLNamespace()` reads target namespace from XML root element
3. **Schema Lookup**: `xmlSchemaStore` matches namespace → finds XSD buffer in `schemas.config.ts`
4. **Validation**: `validateXml()` uses libxml2-wasm to validate XML against loaded XSD
5. **Output**: Results (valid/invalid + error details with line numbers) displayed in UI

**Key files**:
- [validatorStore.ts](app/_store/validatorStore.ts) - Main state (input, results, loading)
- [xmlSchemaStore.ts](app/_store/xmlSchemaStore.ts) - Schema cache + initialization
- [xmlValidator.ts](app/_utils/xml/xmlValidator.ts) - Core validation logic
- [schemas.config.ts](app/_config/schemas.config.ts) - Schema catalog (paths + URNs)
- [validator/page.tsx](app/validator/page.tsx) - UI orchestration

### State Management (Zustand + Immer)

All stores use Zustand with Immer middleware for immutable state mutations:
```typescript
create<T>()(immer((set) => ({...})))  // Allows mutating state like `draft.field = value`
```

Stores are client-only (`"use client"` directive).

### Content Structure (Nextra)

Navigation defined in `content/_meta.ts`:
- Separators: `"0###": { type: "separator", title: "..." }`
- Hidden pages: `display: "hidden"` (e.g., "About")
- External links: `href: "https://..."`
- Nested sections: Market platforms (mFRR_C, aFRR_C) grouped under "Market Platforms"

MDX files compiled automatically; use Callout/Blockquote components from `_mdx-components/` for styled callouts.

### Schema Configuration

`schemas.config.ts` exports schema groups:
- `commonSchemas` - Shared XSD files (extensions, codelists)
- `cimSchemas` - 100+ versioned CIM schema files (e.g., `iec62325-451-2-schedule_v5_2.xsd`)
- Market-specific: `mfrrCSchemas`, `ffrrSchemas`, etc.

Each has `location` (public path) + `filenames[]`. Schema files fetched via HTTP and cached in store.

## Coding Conventions

- **camelCase** for variables/functions; prefer arrow functions
- **Immutability**: Use Immer in stores, const for data structures
- **Async**: async/await required; errors logged (not thrown to users in validator)
- **Types**: Strict TypeScript; see [types.ts](app/types.ts) for core types (`ValidationResult`, `SchemaInfo`)
- **Descriptive Names**: Avoid comments; function names should be self-explanatory
- **Components**: Functional, const-based; use `cn()` from clsx for class composition
- **Testing**: Co-located test files; use Testing Library + jsdom

## Integration Points

- **Fingrid Design System**: Custom components installed as npm package
- **Scalar API Reference**: Embedded for API docs display (`@scalar/nextjs-api-reference`)
- **libxml2-wasm**: Requires initialization before use (see `initializeXmlTools()` in validatorStore)
- **Plausible Analytics**: Tracked on production (data-domain="developers.fingrid.fi")
- **Pagefind**: Search index built during `build:generate_index` step

## Important Notes

- Build output can be either static export (`out/`) or standalone Node.js app (env: `EXPORT_STANDALONE`)
- XML validation runs entirely **client-side** in browser via WASM; no backend required
- Schema fetches are HTTP-based; consider performance with large schema catalogs
- Strict ESLint + TypeScript ensure code quality; fix errors before committing
