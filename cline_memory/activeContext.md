# Active Context: RepoPilot

This document tracks the current focus of work, recent decisions, and immediate next steps for the RepoPilot project.

## 1. Current Focus

-   **Electron Integration:** Implementing Electron framework for native capabilities.
-   **Repository Loading:** Enabling users to select a local repository via native dialog.
-   **File Explorer Population:** Displaying the actual file structure of the selected repository using data fetched via IPC.

## 2. Recent Activities & Decisions

-   **Added Electron:** Integrated Electron, Electron Builder, and supporting Vite plugins.
-   **Configured Build:** Updated `package.json`, `vite.config.ts`, and `tsconfig.json` for Electron development and build.
-   **Implemented IPC:** Set up IPC channel (`ipc-file-system:open-dialog`) between main and renderer processes for directory selection and reading.
-   **Created `fileReader.ts`:** Implemented logic in the main process to recursively read directory structures.
-   **Added Zustand:** Integrated Zustand (`repositoryStore.ts`) for managing repository path and file structure state.
-   **Updated UI:** Connected `Header`, `FileExplorer`, and `SelectedFiles` components to use Electron IPC and Zustand store, removing mock data reliance for file loading.
-   **Defined `electronAPI`:** Exposed necessary functions via preload script.
-   **Decision:** Proceeded with full Electron implementation instead of mock data or Web APIs.
-   **Resolved Launch Issues:** Fixed Electron startup problems related to incorrect `package.json` main entry, preload script build format (requiring explicit Node target in Vite config), and preload script path errors.

## 3. Active Considerations

-   Testing the "Open Repo" flow thoroughly.
-   Addressing potential TS configuration issues identified during setup.
-   Planning the implementation for actual file content preview in `SelectedFiles.tsx`.

## 4. Immediate Next Steps

1.  Verify the "Open Repo" functionality populates the file tree correctly.
2.  Proceed with implementing file content preview.
3.  Continue updating documentation as features are added.