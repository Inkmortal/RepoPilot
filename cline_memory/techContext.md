# Technical Context: RepoPilot

This document outlines the technologies, development environment, technical constraints, and dependencies for the RepoPilot project.

## 1. Core Technologies

-   **Runtime:** Electron (vX.Y.Z - Check `package.json`) for native desktop application shell.
-   **UI Framework:** React (vX.Y.Z - Check `package.json`)
-   **Language:** TypeScript (vX.Y.Z - Check `package.json`)
-   **Build Tool/Bundler:** Vite (vX.Y.Z - Check `package.json`) + `vite-plugin-electron`, `vite-plugin-electron-renderer`.
-   **Package Manager:** Bun (indicated by `bun.lockb`, but `package-lock.json` also exists - clarify usage)
-   **State Management:** Zustand (vX.Y.Z - Check `package.json`)
-   **Styling:** Tailwind CSS (vX.Y.Z) + Shadcn/ui.
-   **Prompt/Diff Format:** XML or JSON for structured prompts, Unified Diff format for applying changes.

## 2. Development Environment

-   **Operating System:** Windows (Target platform)
-   **IDE:** Visual Studio Code (Implied)
-   **Version Control:** Git
-   **Node.js:** Required for Electron, Vite, Bun/NPM. Specific version TBD.

## 3. Key Dependencies (Explicit & Added)

-   `react`, `react-dom`
-   `electron`, `electron-builder` (-D)
-   `vite`, `vite-plugin-electron`, `vite-plugin-electron-renderer` (-D)
-   `typescript` (-D)
-   `tailwindcss` (-D)
-   `zustand`
-   `@radix-ui/*` (Shadcn/ui dependencies)
-   `eslint` (-D)
-   Node.js built-ins: `fs`, `path` (used in `electron/main/fileReader.ts`)
-   Potentially libraries for: Code parsing, XML/JSON handling, Diff parsing/application.

## 4. Technical Constraints & Considerations

-   **Electron Architecture:** Understanding Main vs. Renderer processes, IPC, and preload scripts is crucial.
-   **Security:** Context Isolation is enabled. Avoid enabling `nodeIntegration` in Renderer. Securely expose APIs via `contextBridge`.
-   **Performance:** Directory reading (`readDirectoryStructure`) is currently synchronous (`fs.readdirSync`, `fs.statSync`). Consider async alternatives for large directories if performance issues arise.
-   **Maintainability:** Keep code modular, adhere to file size limits (refactor if needed), ensure consistent typing and linting.
-   **Type Synchronization:** The `FileItem` type needs to be kept consistent between `electron/main/fileReader.ts` and `src/components/file-explorer/types.ts`.

## 5. Build & Deployment

-   **Development:** Run `bun dev` (or `npm run dev`) - uses Vite dev server with Electron.
-   **Build:** Run `bun run build` (or `npm run build`) - uses `tsc` for type checking, `vite build` for frontend bundle, and `electron-builder` for packaging into a Windows installer (NSIS target) in the `release/` directory.
-   **Configuration:** Electron Builder options are set in `package.json` under the `build` key.