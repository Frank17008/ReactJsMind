# AGENTS.md — react-jsmind

> React wrapper around jsMind for rendering interactive mind maps. Published as `@frank17008/react-jsmind`.

## Project Structure

```
├── config/                  # Webpack configs
│   ├── webpack.base.js      # Shared: TSX/TS/JS resolution, babel-loader
│   ├── webpack.dev.config.js  # Dev server (port 8080), entry: examples/
│   ├── webpack.demo.config.js # Demo build for GitHub Pages → dist-demo/
│   └── webpack.prod.config.js # UMD library output to dist/, CSS extraction
├── src/                     # Library source
│   ├── index.tsx            # Main ReactJsMind component (default export)
│   ├── interface.ts         # TypeScript types & interfaces
│   ├── screenshot.tsx       # jsMind plugin for canvas screenshot export
│   └── index.less           # Component styles
├── examples/                # Demo app (dev usage)
│   ├── index.tsx            # ReactDOM.render entry point
│   ├── index.less           # Demo button styles
│   ├── mock.ts              # Sample mind map data (tree & array formats)
│   └── index.html           # HTML shell
├── dist/                    # Production library output
└── dist-demo/               # GitHub Pages demo output
```

## Build & Dev Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on `localhost:8080` |
| `npm run build` | Production build library → `dist/index.js` + `dist/index.min.css` |
| `npm run demo:build` | Build demo for GitHub Pages → `dist-demo/bundle.js` |

### Deploying Demo to GitHub Pages

```bash
# 1. Build demo
npm run demo:build

# 2. Copy index.html to output folder
cp examples/index.html dist-demo/index.html

# 3. Push to gh-pages branch
git subtree push --prefix dist-demo origin gh-pages
```

**GitHub Repository Settings:**
- Source: Deploy from a branch
- Branch: `gh-pages` / `(root)

**No test framework is configured.** There are no test files, no jest/vitest config, and no test scripts. If adding tests, use `vitest` (lightweight, TS-native) or `jest` with `ts-jest`.

## Code Style & Conventions

### Imports
- **Order**: External libraries → Local imports → CSS/Less imports
- **Grouping**: One import per line for React hooks; named imports on single line when few
- **Paths**: Relative imports with `./` prefix (e.g., `import { ... } from './interface'`)
- **CSS side-effects**: Import styles as side-effect imports: `import './index.less'`

### TypeScript
- **No tsconfig.json** — types are handled by `@babel/preset-typescript` (strip-only, no type checking)
- All types/interfaces defined in `interface.ts` — keep them centralized
- Use `interface` for object shapes, `type` for unions/aliases
- `any` is used sparingly (only for jsMind interop); prefer typed interfaces
- `React.CSSProperties` used for style-related type values (color, fontSize, etc.)
- `Omit<..., 'container'>` used to exclude inherited props

### React Patterns
- **Functional components** with hooks only — no class components
- `forwardRef` + `useImperativeHandle` for exposing instance methods to consumers
- `memo()` wrapping default exports for performance
- `useCallback` for stable function references (event handlers)
- `useRef` for DOM refs and mutable non-state values (event cache, jsMind instance)
- `useState` for component state (isReady flag)
- Event handling via native `addEventListener` (not React synthetic events) — required for jsMind DOM nodes

### Naming Conventions
| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `ReactJsMind` |
| Interfaces | PascalCase, prefixed with domain | `JsMindProps`, `JsMindRefValue` |
| Types | PascalCase | `JsMindDataType`, `TreeNode` |
| Variables/functions | camelCase | `jsMindRef`, `handleEvent` |
| Constants | UPPER_SNAKE_CASE | `EVENT_TYPE`, `DEFAULT_OPTIONS` |
| CSS classes | kebab-case or camelCase | `jsmind-editor`, `btns` |
| Files | camelCase | `screenshot.tsx`, `mock.ts` |

### Formatting
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings (JS/TS), double quotes occasionally in examples
- **Semicolons**: Inconsistent — some files use them, some don't. Follow the file you're editing.
- **Trailing commas**: Not enforced
- **Line length**: No hard limit; keep reasonable
- **Comments**: Chinese comments used throughout for config descriptions; English for code logic

### Error Handling
- Runtime `throw new Error(...)` for missing dependencies (screenshot.tsx)
- Optional chaining (`?.`) and nullish coalescing for safe access
- Boolean coercion (`!!value`) for truthy checks
- No try/catch blocks in current codebase
- `(navigator as any)?.msSaveBlob(...)` for browser-specific APIs

### Styling
- **Less** is the CSS preprocessor
- Nested selectors used (e.g., `#jsmind_container { input.jsmind-editor { ... } }`)
- Loaders: `less-loader` → `css-loader` → `style-loader` (dev) or `MiniCssExtractPlugin` (prod)
- jsMind's own CSS imported directly: `import 'jsmind/style/jsmind.css'`

### Build System
- **Webpack 5** with `webpack-merge` for config composition
- **Babel 7** presets: `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`
- Production: UMD library with `libraryExport: 'default'`, externals for `react` and `react-dom`
- CSS: Extracted to `index.min.css` in production, inlined via `style-loader` in dev
- Minification: `TerserPlugin` (drops console/debugger) + `CssMinimizerPlugin`

## Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `jsmind` | ^0.8.5 | Core mind map library |
| `dom-to-image` | ^2.6.0 | Screenshot rendering |
| `react` / `react-dom` | ^17.0.2 | Peer dependency (React 17) |

## Notes for Agents
- **No linting, formatting, or type-checking tools** are configured. Run `npx tsc --noEmit` manually if type validation is needed.
- The `screenshot.tsx` file is a jsMind plugin — it extends `jsMind` via `jsMind.register_plugin()`.
- Events are registered on the native DOM container, not via React synthetic events, because jsMind creates its own DOM nodes.
- The `data` prop accepts both tree format (`TreeNode`) and array format (`ArrayTreeNode`).
- When modifying `interface.ts`, ensure both the `JsMindInstance` (raw jsMind methods) and `JsMindRefValue` (React-friendly camelCase wrappers) stay in sync.
