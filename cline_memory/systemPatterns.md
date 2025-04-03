# System Patterns: RepoPilot

This document outlines the system architecture, key technical decisions, and design patterns for RepoPilot.

## 1. High-Level Architecture

RepoPilot is architected as a native Windows desktop application using:

-   **Electron:** Provides the framework for building desktop apps with web technologies, enabling native capabilities (file system, dialogs, IPC).
-   **React:** Used for building the user interface within Electron's Renderer process.
-   **Node.js:** Electron's Main process runs Node.js for backend logic (file system access via `fs`, IPC handling, future parsing/diffing).
-   **Vite:** Used as the build tool for the React frontend and integrated with Electron via `vite-plugin-electron`.

```mermaid
graph LR
    subgraph Electron Main Process (Node.js)
        direction LR
        FS[fs Module]
        Dialog[Dialog Module]
        FileReader[fileReader.ts]
        IPC_Main[ipcMain]
        Parser[(Code Parser/Indexer)]
        PromptGen[(Prompt Generator)]
        DiffApply[(Diff Applicator)]
    end

    subgraph Electron Renderer Process (Browser Window)
        direction LR
        UI[React UI Components]
        Store[Zustand Store]
        IPC_Renderer[electronAPI (Preload)]
    end

    UI -- User Interactions --> Store
    Store -- Triggers Action --> IPC_Renderer
    IPC_Renderer -- Invokes --> IPC_Main
    IPC_Main -- Calls --> Dialog
    Dialog -- User Selects Path --> IPC_Main
    IPC_Main -- Calls --> FileReader
    FileReader -- Reads FS --> FS
    FS -- Data --> FileReader
    FileReader -- Returns Structure --> IPC_Main
    IPC_Main -- Returns Result --> IPC_Renderer
    IPC_Renderer -- Updates --> Store
    Store -- Updates --> UI

    style Electron Main Process (Node.js) fill:#f9f,stroke:#333,stroke-width:2px
    style Electron Renderer Process (Browser Window) fill:#ccf,stroke:#333,stroke-width:2px
```

## 2. Key Technical Decisions & Patterns

-   **Electron for Native Integration:** Chosen over Web APIs for robust file system access, native dialogs, and potential future OS integrations (context menus).
-   **IPC Communication:** Using Electron's `ipcMain.handle` and `ipcRenderer.invoke` for asynchronous request/response communication between Main and Renderer processes. A preload script (`electron/preload/index.ts`) securely exposes invokable functions to the Renderer (`window.electronAPI`). Channel: `ipc-file-system:open-dialog`.
-   **State Management (Zustand):** Adopted Zustand for managing global UI state, specifically the loaded repository path and its file structure (`src/store/repositoryStore.ts`). This simplifies state sharing between components like `Header` and `FileExplorer`.
-   **Local-First Processing:** Core logic (file reading, future parsing/prompt generation) resides in the Electron Main process, ensuring code stays local.
-   **Structured File Representation:** Using a defined `FileItem` interface (shared conceptually, needs explicit sharing or duplication management) for transferring file/folder data via IPC.
-   **Asynchronous Operations:** Directory reading and IPC are handled asynchronously to prevent blocking.
-   **Build Integration (Vite + Electron):** Using `vite-plugin-electron` and `vite-plugin-electron-renderer`. Requires careful configuration within `vite.config.ts` to specify entry points, output directories/filenames, and target formats (especially CommonJS for preload/main scripts). Explicit Node targeting might be needed for preload scripts.
-   **Component-Based UI (React + Shadcn/ui):** Standard React component model with Shadcn/ui for UI elements.
-   **Type Safety (TypeScript):** Project uses TypeScript for both frontend and backend (Electron main/preload) code.
-   **Packaging (Electron Builder):** Configured in `package.json` for creating distributable Windows installers.

## 3. Potential Future Considerations

-   **Sharing Types:** Implement a mechanism to share the `FileItem` type definition between the main and renderer processes to avoid drift.
-   **Error Handling:** Enhance error reporting and user feedback for failed IPC calls or file system errors.
-   **Performance:** Optimize `readDirectoryStructure` for very large repositories (e.g., asynchronous reads, potential streaming or batching).
-   **Testing:** Implement specific tests for IPC handlers and file reading logic.